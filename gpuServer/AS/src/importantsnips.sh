#get MSCOCO dataset
#(1) install gsutil via: 
curl https://sdk.cloud.google.com 
#Make local dir:
mkdir train2017 
#(3) Synchronize via:
gsutil -m rsync gs://images.cocodataset.org/train2017 train2017

