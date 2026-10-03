---
sidebar_label: LibTorch
---

# LibTorch (PyTorch C++ 前端)

[LibTorch](https://pytorch.org/cppdocs/frontend.html) 是 Pytorch 官方的 C++ 前端。然而，因为它几乎没啥文档，我在用它的过程中（被迫）一边读源码又一边踩了不少坑。于是我打算把踩过的一些坑/有用的 tricks 记录下来以供参考。

截至 2021 年 7 月，这份文档是基于我使用 libtorch v1.9 开发过程中的经验写成的。

## 性能：比 Pytorch 更慢 {#performance-slower-than-python}

许多用户都报告过使用 LibTorch 进行推理的速度要远远比 使用 Python 中的 Pytorch 更慢。可以参见 [#19106](https://github.com/pytorch/pytorch/issues/19106) 中的讨论。

同时，有一篇 [知乎文章](https://zhuanlan.zhihu.com/p/363319763) 对此进行了深入的分析，并提出解决方案：链接 Pytorch 使用的 libraries 之后重新编译 libtorch。

## 兼容 Python 中读/写 Tensor {#cross-saveload-tensors-in-python}

这一部分讲述了如何在 C++ 中保存 tensor 并在 Python 中读取；以及如何在 Python 中保存 tensor 后在 C++ 中读取。这对于程序调试来说很有用（因为 libtorch 的调试过程和报错信息实在是过于不友好了……）

:::info
注意： LibTorch 中的 `torch::save()` 函数 ([source](https://github.com/pytorch/pytorch/blob/v1.9.0/torch/csrc/api/include/torch/serialize.h#L11-L45)) 会将 tensors 保存为一个 TorchScript (JIT) 的 module，而不像 Python 中的 `torch.save()` ([docs](https://pytorch.org/docs/1.9.0/generated/torch.save.html)) 函数直接保存 tensor。
:::

### 在 C++ 中保存 tensor 并在 Python 中读取 {#save-tensor-in-c-and-load-in-python}

在 C++中，调用 `torch::save()` 进行保存。

```cpp
#include <torch/torch.h>

// 保存单个 tensor
torch::save(tensor, "tensor.pt");

// 保存多个 tensors
torch::save({tensora, tensorb, tensorc}, "tensors.pt");
```

在 Python 中，调用 `torch.jit.load()` 进行读取并通过 `parameters` 获取存储在 module 中的 tensor。

```python
import torch

# 读取单个 tensor
tensor_model = torch.jit.load("tensor.pt")
tensor = list(tensor_model.parameters())[0]

# 读取多个 tensor
tensors_model = torch.jit.load("tensors.pt")
tensora = list(tensors_model.parameters())[0]
tensorb = list(tensors_model.parameters())[1]
tensorc = list(tensors_model.parameters())[2]
```

### 在 Python 中保存 tensor 并在 C++ 中读取 {#save-tensor-in-python-and-load-in-c}

以下的代码是从 [pytorch/pytorch#20356 (comment)](https://github.com/pytorch/pytorch/issues/20356#issuecomment-545572400) 中改编而来，并根据 LibTorch v1.8+ API 变化（`get_attribute` => `attr`）有所修改。

在 Python 中保存 tensor：你需要创建一个 model 并把所有需要保存的 tensor 加载到这个 TorchScript module 中。

```python
import torch

class Container(torch.nn.Module):
    def __init__(self, my_values):
        super().__init__()
        for key in my_values:
            setattr(self, key, my_values[key])

my_values = {
    'a': torch.ones(2, 2),
    'b': torch.ones(2, 2) + 10,
    'c': 'hello',
    'd': 6
}

# Save arbitrary values supported by TorchScript
# https://pytorch.org/docs/master/jit.html#supported-type
container = torch.jit.script(Container(my_values))
container.save("container.pt")
```

在 C++ 中读取 tensors

```cpp
#include <torch/script.h>

torch::jit::script::Module container = torch::jit::load("container.pt");

torch::Tensor a = container.attr("a").toTensor();
torch::Tensor b = container.attr("b").toTensor();
std::string c = container.attr("c").toStringRef();

int64_t d = container.attr("d").toInt();
```

### 备选方案：使用 pickle {#alternative-use-pickle}

一个备选方案是使用 `pickle_save` 与 `pickle_load` 函数 ([source](https://github.com/pytorch/pytorch/blob/v1.9.0/torch/csrc/api/include/torch/serialize.h#L76-L77))。 具体用法可参见 [pytorch/pytorch#20356 中的这个评论](https://github.com/pytorch/pytorch/issues/20356#issuecomment-782341150)。

## 推理时输入/输出多个 tensor {#multiple-inputoutput-for-inference}

假设我们 load 了一个叫做 `module` 的模型，并且希望使用它在 LibTorch 中进行推理。但是，这个模型需要接受多个输入参数/输出多个参数。

以下代码修改自 [pytorch/pytorch#18337](https://github.com/pytorch/pytorch/issues/18337)。

```cpp
std::vector<torch::jit::IValue> inputs;
inputs.push_back(tensora);
inputs.push_back(tensorb);

auto outputs = module->forward(inputs).toTuple();

torch::Tensor out1 = outputs->elements()[0].toTensor();
torch::Tensor out2 = outputs->elements()[1].toTensor();
```

:::info
注意：如果模型只有一个输出，你可以直接在 `forward()` 输出后直接调用 `toTensor()`。
:::
