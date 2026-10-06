# Export Model w/ Weights

In some occasions, we need to export the full model (along with the operators, network structures, weights, and biases) so we can run the model using different platforms (e.g. run a pytorch-trained model using OpenCV in C++).

Here, I shall illustrate how to export the full model into a separate file (TorchScript / TensorFlow SavedModel / ONNX) and how to use them for inference.

## Export From PyTorch {#export-from-pytorch}

### to TorchScript {#to-torchscript}

```python
import torch.jit

traced_model = torch.jit.trace(model, ((input_tensor)))
torch.jit.save(traced_model, 'filename.pt')
```

### to ONNX {#to-onnx}

```python
import onnx
print('\nStarting ONNX export with onnx %s...' % onnx.__version__)

torch.onnx.export(model, input_tensor, 'filename.onnx', verbose=False, opset_version=12, input_names=['input'], output_names=['output_1', 'output_2', 'output_3'])
```

## Export From Keras {#export-from-keras}

```python
def freeze_session(session, keep_var_names=None, output_names=None, clear_devices=True):
    """
    Freezes the state of a session into a pruned computation graph.

    Creates a new computation graph where variable nodes are replaced by
    constants taking their current value in the session. The new graph will be
    pruned so subgraphs that are not necessary to compute the requested
    outputs are removed.
    @param session The TensorFlow session to be frozen.
    @param keep_var_names A list of variable names that should not be frozen,
                          or None to freeze all the variables in the graph.
    @param output_names Names of the relevant graph outputs.
    @param clear_devices Remove the device directives from the graph for better portability.
    @return The frozen graph definition.
    """
    graph = session.graph
    with graph.as_default():
        freeze_var_names = list(set(v.op.name for v in tf.global_variables()).difference(keep_var_names or []))
        output_names = output_names or []
        output_names += [v.op.name for v in tf.global_variables()]
        input_graph_def = graph.as_graph_def()
        if clear_devices:
            for node in input_graph_def.node:
                node.device = ""
        frozen_graph = tf.graph_util.convert_variables_to_constants(
            session, input_graph_def, output_names, freeze_var_names)
        return frozen_graph


from tensorflow.keras import backend as K
import tensorflow as tf

frozen_graph = freeze_session(K.get_session(),
                              output_names=[out.op.name for out in model.model.outputs])

tf.train.write_graph(frozen_graph, ".", "rdn-large-denoise-x2-maxpool.pb", as_text=False)
```

## Inference

### In Python

To run inference with torchscript model, we can simply load it and run it as any usual model

```python
tensors_model = torch.jit.load("../filename.pt")

tensora = list(tensors_model.parameters())[0]
tensorb = list(tensors_model.parameters())[1]
tensorc = list(tensors_model.parameters())[2]
tensord = list(tensors_model.parameters())[3]

input_tensors = (tensora, tensorb, tensorc, tensord)

# TODO
```
