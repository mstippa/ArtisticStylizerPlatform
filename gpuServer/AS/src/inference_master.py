"""
original author (https://arxiv.org/pdf/1703.06868.pdf) implementation
"""
import os
os.environ['TF_CPP_MIN_LOG_LEVEL']='3'
import tensorflow as tf
from tensorflow.python.client import device_lib
import argparse
from inference_ops import Ops

parser = argparse.ArgumentParser()
# image paths 
parser.add_argument("content_img_path", type=str, help="full path to content image")
parser.add_argument("style_img_path", type=str, help="full path to style image")
parser.add_argument("result_img_path", type=str, help="full path to results directory where stylized content image is written")

# preprocessing options
parser.add_argument("final_size", default=256, type=int, help="final dimensions of the stylized content image")
parser.add_argument("transient_size", default=512, type=int, help="size images before cropping")
# TODO add arg for alpha parameter

args = parser.parse_args()

with tf.Graph().as_default() as graph:
  devices=device_lib.list_local_devices()
  gpuPresent = [True for device in devices if device.device_type == "GPU"]

  if gpuPresent:
    # TODO must read this flag
    gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=args.per_process_gpu_memory_fraction)
    session_config = tf.ConfigProto(allow_soft_placement=True,
                                    log_device_placement=False,
                                    gpu_options=gpu_options)
    sess = tf.Session(config=session_config)
  else:
    sess = tf.Session()

  model = Ops(args=args)
  model.run(args=args, sess=sess)
