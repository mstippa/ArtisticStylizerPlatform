'''
@author: Michael Guarino
desc:
notes:
'''

import os, re, sys
import numpy as np

import matplotlib.image as mpimg
from scipy.misc import imresize

from utils import COCO_ANNOTATIONS_DIR, COCO_IMAGES_DIR, COCO_PYCOCOTOOLS_DIR, COCO_PYTHONAPI_DIR
from utils import HEIGHT, WIDTH, CHANNELS


def _coco_getIds(dataType, img_dir=COCO_IMAGES_DIR, ann_dir=COCO_ANNOTATIONS_DIR):
    '''
    '''
    allIds = ['{}/{}2014/{}'.format(img_dir, dataType, file) for file in os.listdir('{}/{}2014'.format(img_dir, dataType)) if file.endswith('.jpg')]
    if(dataType == 'train'):
        sys.path.append(COCO_PYTHONAPI_DIR)
        from pycocotools.coco import COCO
        annFile = '{}/instances_{}2014.json'.format(ann_dir, dataType)
        coco = COCO(annFile)
        catIds = coco.getCatIds(catNms=['cat']);
        allCatIds = coco.getImgIds(catIds=catIds);
        allIdsJoined = ','.join(allIds)
        positiveClassIds = list()

        for imgId in allCatIds:
            pattern = ',COCO_{}2014_0+{}.jpg,'.format(dataType, imgId)
            found = re.search(pattern, allIdsJoined)
            if(found != None):
                positiveClassIds.append('{}/{}2014/{}'.format(img_dir, dataType, found.group(0)[1:-1]))
        return allIds, positiveClassIds
    else:
        return allIds


def _liveRun_getIds(img_dir=CLIENTSTREAM_DIR):
    '''
    sort by date...oldest in front of list
    '''
    allIds_sorted = ['{}/{}'.format(img_dir, file) for file in sorted(os.listdir(img_dir)) if file.endswith('.jpg')]
    return allIds_sorted

def _label_data(dataSet, positiveClass):
    '''
    '''
    labels = [1 if file in positiveClass else 0 for file in dataSet]
    if(len(labels)==len(dataSet)):
        return labels
    else:
        print('length of label vector not equal to length of dataset vector \n length of label vector is:{} \n length of dataset is:{}'.format(str(len(labels)), str(len(dataSet))))
        exit(0)

def _prep_data(all_images, all_labels=None, training=False):
    '''
    given a list of image file names and reads in and resizes with bilinear interpolation
    '''
    all_images_count = len(all_images)
    data = np.zeros((all_images_count, HEIGHT, WIDTH, CHANNELS), dtype=np.uint8)
    altered_indices = list()
    for i, image in enumerate(all_images):
        im = mpimg.imread(image)
        resized_image = imresize(im, size=(HEIGHT, WIDTH), interp='bilinear')
        if((im.ndim > 2 or resized_image.ndim > 2) and resized_image.shape[2]==3):
            data[i] = resized_image
            altered_indices.append(i)
    filtered_data = np.zeros((len(altered_indices), HEIGHT, WIDTH, CHANNELS), dtype=np.uint8)
    np.take(data, altered_indices, axis=0, out=filtered_data)

    if training:
        filtered_labels = [all_labels[i] for i in altered_indices]
        return filtered_data, filtered_labels
    else:
        return filtered_data

def get_dataSet(dataType):
    if(dataType == 'liveRun'):
        liveRun_all = _liveRun_getIds()
        image_data = _prep_data(all_images=[liveRun_all[-1]])
        return image_data
    elif(dataType == 'train'):
        coco_all, coco_positiveClass = _coco_getIds(dataType=dataType)
        coco_labels = _label_data(coco_all, coco_positiveClass)
        coco_image_data, coco_image_labels = _prep_data(all_images=coco_all, all_labels=coco_labels, training=True)
        all_image_data = np.vstack((coco_image_data))
        all_image_labels = coco_image_labels
        image_dataDict = {'data':all_image_data, 'labels':all_image_labels}
        return image_dataDict
    elif(dataType == 'test'):
        coco_all = _coco_getIds(dataType=dataType)
        coco_image_data = _prep_data(all_images=coco_all)
        all_image_data = np.vstack((coco_image_data))
        return image_data