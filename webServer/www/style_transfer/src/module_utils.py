import tensorflow as tf
import os
from matplotlib import image
from vgg19 import VGG19
import uuid
import logging
from PIL import Image 
#logger = logging.getLogger("mod_utils")
#logger.setLevel(logging.INFO)
#formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")
#fileHandler = logging.FileHandler("mod_utils.log")
#fileHandler.setFormatter(formatter)

#logger.addHandler(fileHandler)


class Utils:
  def __init__(self, content_img_path, style_img_path, result_img_path, final_size, transient_size, alpha):
    # constants
    self.DECODER_T7 = "style_transfer/src/decoder.t7"
    self.VGG_T7 = "style_transfer/src/vgg_normalised.t7"
    self.ALPHA = alpha

    style_img_path = self._check_ext(img_path=style_img_path)
    content_img_path = self._check_ext(img_path=content_img_path)

    # image paths 
    self.STYLE_IMG_PATH = style_img_path
    self.CONTENT_IMG_PATH = content_img_path
    self.RESULT_IMG_PATH = result_img_path

    #logger.info(self.STYLE_IMG_PATH)
    #logger.info(self.CONTENT_IMG_PATH)
    #logger.info(self.RESULT_IMG_PATH)
  # end

  def _check_ext(self, img_path):
    path_no_ext, ext = os.path.splitext(img_path)
    if ".jpg" == str(ext).lower() or ".jpeg" == str(ext).lower():
      ext = "jpg"
    elif ".png" == str(ext).lower(): 
      ext = "png"
    assert(ext == "jpg" or ext == "png"), "unsupported image file type"
    def _convert_png_to_jpg(img_path, path_no_ext):
      new_jpg_path = "{}.jpg".format(path_no_ext)
      im = Image.open(img_path)
      im = im.convert("RGB")
      im.save(new_jpg_path)
      return new_jpg_path
    # end
    if ext == "png":
     img_path =  _convert_png_to_jpg(img_path=img_path, path_no_ext=path_no_ext)
    return img_path
  # end

  def get_placeholder_inputs(self):
    content_img = tf.placeholder(tf.string, name="content_img")
    style_img = tf.placeholder(tf.string, name="style_img")
    return content_img, style_img
  # end  

  def _build_model(self, model_file):
      model = VGG19(t7_file=model_file) 
      return model
  # end

  def _get_model_output(self, model, input, scope):
    with tf.name_scope(scope):
     output, layers = model.get_rep(input)
     return output, layers
  # end

  def load_img_from_file(self, img_path):
    img = tf.image.decode_jpeg(tf.read_file(img_path))
    img = tf.image.resize_images(img, size=[512, 512])
    return img 
  # end
  
  def write_img_to_file(self, img, size):
    results_dir_files = os.listdir(self.RESULT_IMG_PATH)
    while True:
      unq_filename = "{}_results.jpg".format(str(uuid.uuid1()))
      # unq_filename = "results.jpg"
      if unq_filename not in results_dir_files:
        break
    results_path = os.path.join(self.RESULT_IMG_PATH, unq_filename)
    #print("result_path: {}".format(results_path))
    #logger.info('start writing result')
    #logger.info('unq_filename: {}'.format(results_path))
    image.imsave(results_path, img)
    #logger.info('done writing result')
    return results_path
  # end

  def process_img(self, type, img):
    assert(type=="pre" or "post"), "type of image processing not specified"
    if type == "pre":
      img = tf.reverse(img, axis=[-1]) # reverse channel dim RGB -> BGR as specified by VGG
      img = tf.expand_dims(img, 0) # adds 4th dim in spot 0 
      img = img / 255.0 # pixel values bound to 0:1
    elif type == "post":
      img = tf.reverse(img, axis=[-1])
      img = tf.squeeze(img)
      img = img * 255.0
      img = tf.clip_by_value(img, 0, 255)
      img = tf.cast(img, dtype=tf.uint8)
    return img
  # end

  def AdaIN(self, content_features, style_features, alpha, epsilon=1e-5):
    # borrowed https://github.com/jonrei/tf-AdaIN/blob/master/AdaIN.py
    # normalizes the content_features with scaling and offset from style_features
    style_mean, style_variance = tf.nn.moments(style_features,
		                               [1,2],
					       keep_dims=True) # Calculate the mean and variance of x.
    content_mean, content_variance = tf.nn.moments(content_features,
		                               [1,2],
					       keep_dims=True) # Calculate the mean and variance of x.
    normalized_content_features = tf.nn.batch_normalization(content_features, content_mean,
		                                            content_variance, style_mean,
		                                            tf.sqrt(style_variance), epsilon)
    normalized_content_features = alpha * normalized_content_features + (1 - alpha) * content_features
    return normalized_content_features 
  # end
# end
