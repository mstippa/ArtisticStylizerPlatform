import tensorflow as tf
from module_utils import Utils
import logging
#logger = logging.getLogger("inference_ops")
#logger.setLevel(logging.INFO)
#formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")
#fileHandler = logging.FileHandler("inference_ops.log")
#fileHandler.setFormatter(formatter)
#
#logger.addHandler(fileHandler)
#
#logger.info("in inference_op script")

class Ops(Utils):
  def __init__(self, content_img_path, style_img_path, result_img_path, final_size, transient_size, alpha):
    super().__init__(content_img_path, style_img_path, result_img_path, final_size, transient_size, alpha)
  # end

  def run(self, sess):
    """
    """
    content_img_placeholder, style_img_placeholder = self.get_placeholder_inputs()

    with tf.name_scope("load"):
      content_img = self.load_img_from_file(img_path=content_img_placeholder)
      style_img = self.load_img_from_file(img_path=style_img_placeholder)

    with tf.name_scope("preprocess"):
      content_img = self.process_img(type="pre", img=content_img)
      style_img = self.process_img(type="pre", img=style_img)

    with tf.name_scope("encoder"):
      encoder = self._build_model(model_file=self.VGG_T7)
      _, encoded_content = self._get_model_output(model=encoder,
		                                  input=content_img,
		                                  scope="content")
      _, encoded_style = self._get_model_output(model=encoder,
		                                input=style_img,
		                                scope="style")

    with tf.name_scope("adain"):
      stylized_content = self.AdaIN(content_features=encoded_content[30],
		                    style_features=encoded_style[30],
				    alpha=self.ALPHA)

    with tf.name_scope("decoder"):
      decoder = self._build_model(model_file=self.DECODER_T7)
      decoded_content, _ = self._get_model_output(model=decoder,
		                                  input=stylized_content,
					          scope="stylized_content")

    with tf.name_scope("postprocess"):
      decoded_content = self.process_img(type="post", img=decoded_content)
    
    init = tf.global_variables_initializer()
    sess.run(init)
    decoded_content = sess.run(decoded_content,
		            feed_dict={content_img_placeholder:self.CONTENT_IMG_PATH,
    	                               style_img_placeholder:self.STYLE_IMG_PATH})
    with tf.name_scope("write"):
      results_path = self.write_img_to_file(img=decoded_content, size=[1024, 1024])
      return results_path
  # end
# end
