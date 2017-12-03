import os
import logging
import subprocess
import re
import pandas as pd
import six
import datetime

logger = logging.getLogger("processManager")
logger.setLevel(logging.INFO)

formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")

fileHandler = logging.FileHandler("processManager.log")
fileHandler.setFormatter(formatter)

logger.addHandler(fileHandler)

cw_dir = os.getcwd()
style_transfer_dir = os.path.join(cw_dir, "style_transfer/src")

def get_tf_status(filename="inference_master.log"):
  logger.info("get_tf_status")
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

def remove_min_elm(file, df, min_rank):
  df = df.drop(df[df["queue_rank"] == min_rank].index)
  if df.empty:
    os.remove(file)
  else:
    df.to_json(file, orient="records")
# end

def get_min_queue_rank_elm(df):
  logger.info("min_queue_rank")
  min_rank = min(df["queue_rank"].tolist())
  logger.info('min_rank:{}'.format(min_rank))
  min_elm_df = df[df["queue_rank"] == min_rank]
  logger.info(min_elm_df)
  min_elm_dict = min_elm_df.to_dict(orient="records")
  logger.info(min_elm_dict)
  return min_rank, min_elm_dict
# end

def start_tf_process(data_dict, dir=style_transfer_dir, filename="inference_master.py"):
  logger.info("start_tf_process")
  logger.info(os.path.join(dir, filename))
  logger.info(data_dict)
  logger.info(data_dict[0]["content_img_path"])
  logger.info(type(data_dict[0]["final_size"]))
  logger.info(type(data_dict[0]["transient_size"]))
  subprocess.Popen("python3 {} {} {} {} {} {}".format(
                    os.path.join(dir, filename),
                    data_dict[0]["content_img_path"], 
                    data_dict[0]["style_img_path"],
                    str(data_dict[0]["result_img_path"]),
                    str(data_dict[0]["final_size"]),
                    str(data_dict[0]["transient_size"])), shell=True, stdout=subprocess.PIPE).wait()
  logger.info("start_tf_process end")
# end

def run(queue_file):
  queue_df = load_json(file=queue_file)
  min_rank, min_elm_dict = get_min_queue_rank_elm(df=queue_df)
  start_time = datetime.datetime.now() # time before style transfer 
  start_tf_process(data_dict=min_elm_dict)
  end_time = datetime.datetime.now() # time after style transfer
  remove_min_elm(file=queue_file, df=queue_df, min_rank=min_rank)
  # print out for nodejs event listener
  print("start_time: {},\
    end_time: {},\
    content_size: {},\
    profile_id: {},\
    style_id: {},\
    premium_style_id: {},\
    content_path: {}".format(start_time,
                             end_time,
                             str(min_elm_dict[0]["final_size"]),
                             "profile_id",
                             "style_id",
                             "premium_style_id",
                             min_elm_dict[0]["content_img_path"]))
# end

while True:
  # check if queue exits 
  queue_file = "process_queue.json"
  if queue_file in os.listdir(os.getcwd()):
    if os.stat(queue_file).st_size != 0:
      if "inference_master.log" in os.listdir(os.getcwd()):
        tf_free = get_tf_status()
        if tf_free:
          logger.info("tf is free")
          run(queue_file=queue_file)
      else:
        run(queue_file=queue_file)
