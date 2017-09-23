# @author: Michael Guarino

#!/bin/sh

OS=$1
URL=$2

if [$OS == "OSX"]
then
    brew install wget
fi

wget $URL
tar -xvzf *.tar.gz

DATADIR=$PWD/../data/
rm *.tar.gz
#mv aclImdb $DATADIR
