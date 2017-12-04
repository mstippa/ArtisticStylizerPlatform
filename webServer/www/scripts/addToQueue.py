import os
import argparse
import json
import pandas as pd
import logging
import datetime

def load_json(file):
  logger.info("load_json")
  logger.info(file)
  #with open(file, "r") as json_file:
  #  persisted_processes = json.load(json_file)
  #logger.info(persisted_processes)
  persisted_processes = pd.read_json(file, orient="records")
  logger.info(persisted_processes)
  return persisted_processes
# end

def write_to_json(file, df):
  logger.info("write_to_json")
  # TODO check that this appends and does not completely write over
  logger.info(file)
  logger.info(df)
  df.to_json(file, orient="records")
# end

def create_df(data_dict):
  logger.info("create_df")
  df = pd.DataFrame([data_dict])
  logger.info(df)
  return df
# end

def update_rank(data_dict, max_rank):
  logger.info("update_rank")
  logger.info(data_dict)
  data_dict["queue_rank"] = max_rank + 1
  logger.info(data_dict)
  return data_dict
# end

def join_dfs(df1, df2):
  logger.info("join_dfs")
  complete_df = pd.concat([df1, df2])
  logger.info(complete_df)
  return complete_df 
# end

def max_queue_rank(df):
  logger.info("max_queue_rank")
  max_rank = max(df["queue_rank"].tolist())
  logger.info('max_rank:{}'.format(max_rank))
  return max_rank
# end

logger = logging.getLogger("addToQueue")
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s:%(name)s:%(message)s')

fileHandler = logging.FileHandler('addToQueue.log')
fileHandler.setFormatter(formatter)

logger.addHandler(fileHandler)

parser = argparse.ArgumentParser()
parser.add_argument("content_img_path", type=str, help="full path to content image")
parser.add_argument("style_img_path", type=str, help="full path to style image")
parser.add_argument("result_img_path", type=str, help="full path to results directory where stylized content image is written")
parser.add_argument("final_size", default=256, type=int, help="final dimensions of the stylized content image")
parser.add_argument("transient_size", default=512, type=int, help="size images before cropping")
parser.add_argument("profile_id", type=str, help="profile id")
parser.add_argument("style_id", type=str, help="style id")
parser.add_argument("ps_id", type=str, help="ps id")

args = parser.parse_args()

current_process_data = {
  "content_img_path":args.content_img_path,
  "style_img_path":args.style_img_path,
  "result_img_path":args.result_img_path,
  "final_size":args.final_size,
  "transient_size":args.transient_size,
  "profile_id":args.profile_id,
  "style_id":args.style_id,
  "ps_id":args.ps_id,
  "queue_rank":0
}

json_file = "process_queue.json"
json_file = os.path.join(os.getcwd(), json_file)

logger.info("#################new process######################")
logger.info("incoming process data: {}".format(current_process_data))

if os.path.exists(json_file):
  persisted_processes_json = load_json(file=json_file)
  max_rank = max_queue_rank(df=persisted_processes_json)
  current_process_data = update_rank(data_dict=current_process_data, max_rank=max_rank)
  current_process_data_df = create_df(current_process_data)
  df_complete = join_dfs(df1=persisted_processes_json, df2=current_process_data_df)
  #TODO update current element to max +1
  write_to_json(file=json_file, df=df_complete)
else:
  os.mknod(os.path.join(os.getcwd(), json_file))
  current_process_data_df = create_df(current_process_data)
  write_to_json(file=json_file, df=current_process_data_df)