"""
original author (https://arxiv.org/pdf/1703.06868.pdf) implementation
"""
import os
os.environ['TF_CPP_MIN_LOG_LEVEL']='3'
import tensorflow as tf
from tensorflow.python.client import device_lib
import logging
from inference_ops import Ops

#logger = logging.getLogger("inference_master")
#logger.setLevel(logging.INFO)
#formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")
#fileHandler = logging.FileHandler("inference_master.log")
#fileHandler.setFormatter(formatter)
#logger.addHandler(fileHandler)
#logger.info("in inference_master script")


def get_inference(content_img_path, style_img_path, result_img_path, final_size=256, transient_size=512, alpha=1):

  # TODO add arg for alpha parameter
  with tf.Graph().as_default() as graph:
    devices=device_lib.list_local_devices()
    gpuPresent = [True for device in devices if device.device_type == "GPU"]

    #logger.info('inside graph')
    if gpuPresent:
      # TODO must read this flag
      gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.1)
      session_config = tf.ConfigProto(allow_soft_placement=True,
                                      log_device_placement=False,
                                      gpu_options=gpu_options)
      sess = tf.Session(config=session_config)
    else:
      sess = tf.Session()
    
    #logger.info("start style transfer")
    model = Ops(content_img_path, style_img_path, result_img_path, final_size, transient_size, alpha)
    #logger.info("ops done")
    results_path =  model.run(sess=sess)
    #logger.info("end style transfer")
    return results_path
# end
