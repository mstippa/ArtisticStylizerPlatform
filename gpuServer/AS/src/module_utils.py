import tensorflow as tf
import os
from matplotlib import image
from vgg19 import VGG19

class Utils:
  def __init__(self, FLAGS):
    print('Utils constructor')
    # constants
    self.DECODER_T7 = "../lib/model_files/decoder.t7"
    self.VGG_T7 = "../lib/model_files/vgg_normalised.t7"
    self.ALPHA = 1
    self.init_FLAGS(FLAGS)
  # end

  def init_FLAGS(self, FLAGS):
    # TODO determine if other flags are needed
    # image paths 
    self.STYLE_IMG_PATH = FLAGS.style_img_path
    self.CONTENT_IMG_PATH = FLAGS.content_img_path
    self.RESULT_IMG_PATH = FLAGS.result_img_path

    self.STYLE_EXT_TYPE = self._get_ext(img_path=FLAGS.style_img_path)
    self.CONTENT_EXT_TYPE = self._get_ext(img_path=FLAGS.content_img_path)
  # end

  def _get_ext(self, img_path):
    # TODO this is currently not being used
    _, ext = os.path.splitext(img_path)
    return ext
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
    #img = tf.image.decode_png(tf.read_file(img_path))
    img = tf.image.decode_jpeg(tf.read_file(img_path))
    img = tf.image.resize_images(img, size=[512, 512])
    return img 
  # end
  
  def write_img_to_file(self, img, size):
    image.imsave(os.path.join(self.RESULT_IMG_PATH, "results.jpg"), img)
    #img = tf.image.resize_images(img, size=size)
    #filewritten = tf.write_file(self.RESULT_IMG_PATH, tf.image.encode_jpeg(tf.cast(img, dtype=tf.uint8)))
    #return filewritten

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
