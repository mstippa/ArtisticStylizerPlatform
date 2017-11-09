"""
original author (https://arxiv.org/pdf/1703.06868.pdf) implementation
"""

import tensorflow as tf
from tensorflow.python.client import device_lib
from inference_ops import Ops

# image paths 
tf.flags.DEFINE_string("style_img_path", "/home/mike/temps/megaseeds.jpg", "style image directory path")
tf.flags.DEFINE_string("content_img_path", "/home/mike/temps/freedom.jpg", "content image directory path")
tf.flags.DEFINE_string("result_img_path", "/home/mike/results", "result image directory directory path")

# preprocessing options
tf.flags.DEFINE_integer("final_size", 256, "size of image used for training")
tf.flags.DEFINE_integer("transient_size", 512, "size images before cropping,")

# pastiche options
tf.flags.DEFINE_float("weighting_factor_content_loss", 1, "contribution of content loss")
tf.flags.DEFINE_float("weighting_factor_style_loss", 1, "contribution of style loss")
tf.flags.DEFINE_float("weighting_factor_tv_loss", 0, "contribution of tv loss")
tf.flags.DEFINE_string("target_content_layer", "relu4_1", "target content layer used "
                                                          "to compute loss")
tf.flags.DEFINE_string("target_style_layers", "relu1_1 relu2_1 relu3_1 relu4_1",
                       "target style layers used to compute the loss, as space separated list")

# model options
tf.flags.DEFINE_integer("batch_size", 1, "batch size (default: 15)")
tf.flags.DEFINE_string("activation", "relu", "activation function in the decoder")
tf.flags.DEFINE_string("optimizer", "adam", "optimizer used")
tf.flags.DEFINE_float("learning_rate", 1e-4, "learning rate")
tf.flags.DEFINE_float("learning_rate_decay", 5e-5, "learning rate decay")
tf.flags.DEFINE_float("momentum", 0.9, "momentum")
tf.flags.DEFINE_float("weight_decay", 0, "weight decay")

FLAGS = tf.flags.FLAGS
FLAGS._parse_flags()

with tf.Graph().as_default() as graph:
  devices=device_lib.list_local_devices()
  gpuPresent = [True for device in devices if device.device_type == "GPU"]

  if gpuPresent:
    # TODO must read this flag
    gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=FLAGS.per_process_gpu_memory_fraction)
    session_config = tf.ConfigProto(allow_soft_placement=True,
                                    log_device_placement=False,
                                    gpu_options=gpu_options)
    sess = tf.Session(config=session_config)
  else:
    sess = tf.Session()

  model = Ops(FLAGS=FLAGS)
  model.run(FLAGS=FLAGS, sess=sess)

