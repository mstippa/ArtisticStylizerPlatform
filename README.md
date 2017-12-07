# Artistic Style Transfer

## Overview
This repo contains a web application that lets users express themselves by stylistically enhancing their content. This application allows users to upload their images and artistic styles and transfer the artistic style to their content. This is an active area of research in Deep Learning called Style Transfer. The algorithm contained in this repo stylizes content images and runs at 15 FPS with 512x512 images on a Pascal 1080 TI.

## Software Stack
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Tensorflow](https://www.tensorflow.org/)
* [MySQL](https://www.mysql.com/)
* [Ajax](https://api.jquery.com/category/ajax/)
* [Bootstrap](https://getbootstrap.com/)

## Style Transfer Algorithm

### Implement for Image Style Transfer
* Style Transfer Algorithm Implemented: [Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization](https://arxiv.org/abs/1703.06868)
* Inspired by: 
** [Instance Normalization: The Missing Ingredient for Fast Stylization](https://arxiv.org/abs/1607.08022)
** [Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization](https://arxiv.org/abs/1703.06868)
** [A Learned Representation For Artistic Style](https://arxiv.org/abs/1610.07629)
** [Perceptual Losses For Real Time Style Transfer Super Resolution](https://arxiv.org/abs/1603.08155)

### AdaIN-style Author Implementation in Torch
AdaIN author's implementation (in [Torch](http://torch.ch/))

## Project Structure
### Files in this directory
* MSCOCO data processing [dataProcessing.py](src/dataProcessing.py)
* directory utilities [utils.py](src/utils.py)
* getMSCOCO downloads mscoco dataset...may already be in mscoco api [getMSCOCO.sh](src/getMSCOCO.sh)


## changing application state

### to start application
`pm2 start server.js`

### to stop application
`pm2 stop server.js`

## Reporting

### system information

### start dashboard
`pm2 link 5fduxt4k930tys4 gzy5e65009xm91z` this will take you to a login for the artilizer application

### view system logs
`pm2 logs` to show system logs
 or 
`pm2 logs --json` logs in JSON format

`pm2 show` great view of apt uptime and paths to logs

much of the reporting this application can be found in `server-out-0.log`

### remove system logs
`pm2 flush` to flush logs


## TODOs
### Make sure that download and mscoco python api is set up
* remove form element upload style because it's not working
