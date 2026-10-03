---
sidebar_label: LibTorch
---

# LibTorch (PyTorch C++ Frontend)

[LibTorch](https://pytorch.org/cppdocs/frontend.html) is the official C++ frontend for Pytorch. However, due to its lack of documentation, I encountered lots of confusions during its use. Some useful tips/tricks are listed here just FYI.

As of July 2021, this documentation is written based on my experience with libtorch v1.9

## Performance: slower than Python {#performance-slower-than-python}

It is repeatedly reported that inference using LibTorch is much slower than that in Python. See discussions in [#19106](https://github.com/pytorch/pytorch/issues/19106).

There is also [a ZhiHu article](https://zhuanlan.zhihu.com/p/363319763) (in Chinese) that attempts to analyze this issue in-depth. The solution it proposed was to recompile libtorch by linking to libraries used by pytorch.

## Cross-Save/Load Tensors in Python {#cross-saveload-tensors-in-python}

This section documents how to save tensors in C++ and load them into Python, and vice versa. It is often done for more friendly debugging experience offered by the Python frontend.

:::info
Note that LibTorch `torch::save()` function ([source](https://github.com/pytorch/pytorch/blob/v1.9.0/torch/csrc/api/include/torch/serialize.h#L11-L45)) saves the tensors in a wrapped TorchScript (JIT) module, unlike `torch.save()` ([docs](https://pytorch.org/docs/1.9.0/generated/torch.save.html)) in Python.
:::

### Save tensor in C++ and load in Python {#save-tensor-in-c-and-load-in-python}

In C++, call `torch::save()` to save.

```cpp
#include <torch/torch.h>

// save one tensor
torch::save(tensor, "tensor.pt");

// save multiple tensors
torch::save({tensora, tensorb, tensorc}, "tensors.pt");
```

In Python, use `torch.jit.load()` to load.

```python
import torch

# Load one tensor
tensor_model = torch.jit.load("tensor.pt")
tensor = list(tensor_model.parameters())[0]

# Load multiple tensors
tensors_model = torch.jit.load("tensors.pt")
tensora = list(tensors_model.parameters())[0]
tensorb = list(tensors_model.parameters())[1]
tensorc = list(tensors_model.parameters())[2]
```

### Save tensor in Python and load in C++ {#save-tensor-in-python-and-load-in-c}

The following codes are adapted from [pytorch/pytorch#20356 (comment)](https://github.com/pytorch/pytorch/issues/20356#issuecomment-545572400) and updated for the v1.8+ API (`get_attribute` => `attr`).

Save tensors in Python: to do so, you have to create a model and include all tensors into this TorchScript module.

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

Load tensors in C++

```cpp
#include <torch/script.h>

torch::jit::script::Module container = torch::jit::load("container.pt");

torch::Tensor a = container.attr("a").toTensor();
torch::Tensor b = container.attr("b").toTensor();
std::string c = container.attr("c").toStringRef();

int64_t d = container.attr("d").toInt();
```

### Alternative: use pickle {#alternative-use-pickle}

An alternative is to use `pickle_save` and `pickle_load` ([source](https://github.com/pytorch/pytorch/blob/v1.9.0/torch/csrc/api/include/torch/serialize.h#L76-L77)). See [this comment in pytorch/pytorch#20356](https://github.com/pytorch/pytorch/issues/20356#issuecomment-782341150) for usage.

## Multiple Input/Output for Inference {#multiple-inputoutput-for-inference}

Suppose we have loaded a model named `module` and want to use it for inference. However, the model requires multiple inputs/outputs.

The codes are adapted from [pytorch/pytorch#18337](https://github.com/pytorch/pytorch/issues/18337).

```cpp
std::vector<torch::jit::IValue> inputs;
inputs.push_back(tensora);
inputs.push_back(tensorb);

auto outputs = module->forward(inputs).toTuple();

torch::Tensor out1 = outputs->elements()[0].toTensor();
torch::Tensor out2 = outputs->elements()[1].toTensor();
```

:::info
Note: if you only have one output, you can directly call `toTensor()` on the output of `forward()`.
:::
