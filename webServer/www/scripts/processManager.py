import os
import logging
import subprocess
import re
import pandas as pd
import six



logger = logging.getLogger("processManager")
logger.setLevel(logging.INFO)

formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")

fileHandler = logging.FileHandler("processManager.log")
fileHandler.setFormatter(formatter)

logger.addHandler(fileHandler)

cw_dir = os.getcwd()
gpuServer_dir = os.path.join("/".join(cw_dir.split("/")[:-2]), "gpuServer/AS/src")

if six.PY2:
  logger.info("python2")
else:
  logger.info("python3")

def get_tf_status(dir=gpuServer_dir, filename="inference_master.log"):
  logger.info("get_tf_status")
  #last_line = subprocess.check_output(['tail', '-1', os.path.join(dir, filename)])
  last_line = subprocess.check_output(['tail', '-1', filename])
  pattern = re.compile(b"inference_master:end style transfer")
  if re.search(pattern, last_line):
    tf_free = True
  else:
    tf_free = False
  logger.info(last_line)
  logger.info(tf_free)
  return tf_free
# end

def load_json(file):
  logger.info("load_json")
  logger.info(file)
  persisted_processes = pd.read_json(file, orient="records")
  logger.info(persisted_processes)
  return persisted_processes
# end

def get_min_queue_rank_elm(df):
  logger.info("min_queue_rank")
  min_rank = min(df["queue_rank"].tolist())
  logger.info('min_rank:{}'.format(min_rank))
  min_elm_df = df[df["queue_rank"] == min_rank]
  logger.info(min_elm_df)
  min_elm_dict = min_elm_df.to_dict(orient="records")
  logger.info(min_elm_dict)
  return min_elm_dict
# end

def start_tf_process(data_dict, dir=gpuServer_dir, filename="inference_master.py"):
  logger.info("start_tf_process")
  logger.info(os.path.join(dir, filename))
  logger.info(data_dict[0]["content_img_path"])
  logger.info(type(data_dict[0]["final_size"]))
  logger.info(type(data_dict[0]["transient_size"]))
  subprocess.Popen("python3 {} {} {} {} {} {}".format(
                    os.path.join(dir, filename),
                    data_dict[0]["content_img_path"], 
                    data_dict[0]["style_img_path"],
                    data_dict[0]["result_img_path"],
                    str(data_dict[0]["final_size"]),
                    str(data_dict[0]["transient_size"])), shell=True, stdout=subprocess.PIPE).wait()
  logger.info("start_tf_process end")
# end

logger.info("############## next ############")
while True:
  tf_free = get_tf_status()
  logger.info("after checking tf status")
  if tf_free:
    logger.info("tf is free")
    queue_df = load_json(file="process_queue.json")
    min_elm_dict = get_min_queue_rank_elm(df=queue_df)
    start_tf_process(data_dict=min_elm_dict)
  exit(0)
  #else:
    #wait
