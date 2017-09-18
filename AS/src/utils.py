"""
@author: Michael Guarino
"""

import os
import subprocess
import platform

HEIGHT = 64
WIDTH = 64
CHANNELS = 3


# http://cocodataset.org/#download
# https://github.com/pdollar/coco

class prjPaths:
    def __init__(self, getDataset=True):
        self.SRC_DIR = os.path.abspath(os.path.curdir)
        self.ROOT_MOD_DIR = "/".join(self.SRC_DIR.split("/")[:-1])
        self.ROOT_DATA_DIR = os.path.join(self.ROOT_MOD_DIR, "data")
        self.LIB_DIR = os.path.join(self.ROOT_MOD_DIR, "lib")
        self.CHECKPOINT_DIR = os.path.join(self.LIB_DIR, "chkpts")
        self.CHECKPOINTS_CNN = os.path.join(self.CHECKPOINT_DIR, "cnn_chkpts/")
        self.LOGS_DIR = os.path.join(self.LIB_DIR, "logs")
        #ms coco data
        self.COCO_DIR = os.path.join(self.ROOT_DATA_DIR, 'coco')
        self.COCO_IMAGES_DIR = os.path.join(self.COCO_DIR, 'images')
        self.COCO_ANNOTATIONS_DIR = os.path.join(self.COCO_DIR, 'annotations')
        self.COCO_IMAGES_TRAIN_DIR = os.path.join(self.COCO_IMAGES_DIR, 'train2014')
        self.COCO_IMAGES_VAL_DIR = os.path.join(self.COCO_IMAGES_DIR, 'val2014')
        self.COCO_IMAGES_TEST_DIR = os.path.join(self.COCO_IMAGES_DIR, 'test2014')
        #ms coco pycocotools
        self.COCO_PYTHONAPI_DIR = os.path.join(self.COCO_DIR, 'PythonAPI')
        self.COCO_PYCOCOTOOLS_DIR = os.path.join(self.COCO_PYTHONAPI_DIR, 'pycocotools')
        if getDataset:
            osType = platform.system()
            if osType == "Windows":
                print("manually download data set from 'http://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz'"
                      " and set getDataset=False when prjPaths is called in *_master.py script")
                exit(0)
            elif osType is not "Linux":
                osType = "OSX"

            if not os.path.exists(self.ROOT_DATA_DIR):
                os.mkdir(path=self.ROOT_DATA_DIR)
            subprocess.Popen("sh getMSCOCO.sh {}".format(osType), shell=True, stdout=subprocess.PIPE).wait()
    # end
# end
