import os
import logging
import re
import pandas as pd
import six
import datetime
import sys
import time
import inference_master 

#logger = logging.getLogger("processManager")
#logger.setLevel(logging.INFO)
#
#formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")
#
#fileHandler = logging.FileHandler("processManager.log")
#fileHandler.setFormatter(formatter)
#
#logger.addHandler(fileHandler)


def get_tf_status(filename="inference_master.log"):
  #logger.info("get_tf_status")
  last_line = subprocess.check_output(['tail', '-1', filename])
  pattern = re.compile(b"inference_master:end style transfer")
  if re.search(pattern, last_line):
    tf_free = True
  else:
    tf_free = False
  #logger.info(last_line)
  #logger.info(tf_free)
  return tf_free
# end

def load_json(file):
  #logger.info("load_json")
  #logger.info(file)
  persisted_processes = pd.read_json(file, orient="records")
  #logger.info(persisted_processes)
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
  #logger.info("min_queue_rank")
  min_rank = min(df["queue_rank"].tolist())
  #logger.info('min_rank:{}'.format(min_rank))
  min_elm_df = df[df["queue_rank"] == min_rank]
  #logger.info(min_elm_df)
  min_elm_dict = min_elm_df.to_dict(orient="records")
  #logger.info(min_elm_dict)
  return min_rank, min_elm_dict
# end

def start_tf_process(data_dict, filename="inference_master.py"):
  cw_dir = os.getcwd()
  dir = os.path.join(cw_dir, "style_transfer/src")
  #logger.info("start_tf_process")
  #logger.info(os.path.join(dir, filename))
  #logger.info(data_dict)
  #logger.info(data_dict[0]["content_img_path"])
  #logger.info(type(data_dict[0]["final_size"]))
  #logger.info(type(data_dict[0]["transient_size"]))
  results_path=inference_master.get_inference(content_img_path=data_dict[0]["content_img_path"], 
                                              style_img_path=data_dict[0]["style_img_path"],
                                              result_img_path=str(data_dict[0]["result_img_path"]),
                                              final_size=str(data_dict[0]["final_size"]),
                                              transient_size=str(data_dict[0]["transient_size"]))
  return results_path
  #logger.info("start_tf_process end")
# end

def run(queue_file):
  queue_df = load_json(file=queue_file)
  min_rank, min_elm_dict = get_min_queue_rank_elm(df=queue_df)
  start_time = datetime.datetime.now() # time before style transfer 
  results_path=start_tf_process(data_dict=min_elm_dict)
  end_time = datetime.datetime.now() # time after style transfer
  remove_min_elm(file=queue_file, df=queue_df, min_rank=min_rank)
  result_img_size = os.stat(results_path).st_size
  # print out for nodejs event listener
  #print(results_path)
  print("{}, {}, {}, {}, {}, {}, {}, {}".format(start_time,
                                                end_time,
                                                result_img_size//1000,
                                                min_elm_dict[0]["profile_id"],
                                                min_elm_dict[0]["style_id"],
                                                min_elm_dict[0]["ps_id"], 
                                                results_path.split("/")[-1],
                                                min_elm_dict[0]["content_img_path"]))
  sys.stdout.flush()
# end

if __name__ == "__main__":

  while True:
    # check if queue exits
    queue_file = "process_queue.json"
    if queue_file in os.listdir(os.getcwd()):
      if os.stat(queue_file).st_size != 0:
        run(queue_file=queue_file)
