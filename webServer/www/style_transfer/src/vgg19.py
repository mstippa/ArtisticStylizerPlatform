import tensorflow as tf
import torchfile

class VGG19:
  def __init__(self, t7_file):
    """
    :param input img to vgg19 inputwork 
    :param t7_file path to trained torch files provided here https://s3.amazonaws.com/xunhuang-public/adain/*

    borrowed https://github.com/jonrei/tf-AdaIN/blob/master/AdaIN.py
    """
    self.t7_restored_model = torchfile.load(t7_file, force_8bytes_long=False)
  # end

  def get_rep(self, input):
    layers = []
    for idx, module in enumerate(self.t7_restored_model.modules):
      if module._typename == b'nn.SpatialReflectionPadding':
        left = module.pad_l
        right = module.pad_r
        top = module.pad_t
        bottom = module.pad_b
        input = tf.pad(input, [[0, 0], [top, bottom], [left, right], [0, 0]], 'REFLECT')
        layers.append(input)
      elif module._typename == b'nn.SpatialConvolution':
        weight = module.weight.transpose([2, 3, 1, 0])
        bias = module.bias
        strides = [1, module.dH, module.dW, 1]  # Assumes 'NHWC'
        input = tf.nn.conv2d(input, weight, strides, padding='VALID')
        input = tf.nn.bias_add(input, bias)
        layers.append(input)
      elif module._typename == b'nn.ReLU':
        input = tf.nn.relu(input)
        layers.append(input)
      elif module._typename == b'nn.SpatialUpSamplingNearest':
        d = tf.shape(input)
        size = [d[1] * module.scale_factor, d[2] * module.scale_factor]
        input = tf.image.resize_nearest_neighbor(input, size)
        layers.append(input)
      elif module._typename == b'nn.SpatialMaxPooling':
        input = tf.nn.max_pool(input, ksize=[1, module.kH, module.kW, 1], strides=[1, module.dH, module.dW, 1],
			     padding='VALID', name=str(module.name, 'utf-8'))
        layers.append(input)
      else:
        raise NotImplementedError(module._typename)
    return input, layers
  # end
# end
