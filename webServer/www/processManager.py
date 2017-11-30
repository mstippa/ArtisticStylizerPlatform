import os
import argparse
import json
import pandas as pd

parser = argparse.ArgumentParser()
parser.add_argument("content_img_path", type=str, help="full path to content image")
parser.add_argument("style_img_path", type=str, help="full path to style image")
parser.add_argument("result_img_path", type=str, help="full path to results directory where stylized content image is written")
parser.add_argument("final_size", default=256, type=int, help="final dimensions of the stylized content image")
parser.add_argument("transient_size", default=512, type=int, help="size images before cropping")
args = parser.parse_args()

def load_json(file):
  with open(file, "r") as json_file:
    persisted_processes = json.load(json_file)
  return persisted_processes
# end

def write_to_json(file, data):
  # TODO check that this appends and does not completely write over
  with open(file, "a") as json_file:
    json.dump(data, json_file)
# end

current_process_data = {
  "content_img_path":args.content_img_path,
  "style_img_path":args.style_img_path,
  "result_img_path":args.result_img_path,
  "final_size":args.final_size,
  "transient_size":args.transient_size,
  "queue_rank":0
}

json_file = "process_queue.json"

if os.path.exists(os.path.join(os.getcwd(), json_file)):
  persisted_processes_json = load_json(file=json_file)
  #TODO get max element in queue
  #TODO update current element to max +1
  write_to_json(file=json_file, data=current_process_data)
  print(persisted_processes_json) 
else:
  os.mknod(os.path.join(os.getcwd(), json_file))
  write_to_json(file=json_file, data=current_process_data)
  persisted_processes_json = load_json(file=json_file)
  print(persisted_processes_json) 

# if there is no process running kick off next element in queue
