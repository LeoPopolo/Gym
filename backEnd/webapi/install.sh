#!/bin/bash

. ./setenv.sh

if [ "$1" == "populate" ]
then
    make sampleData

    exit 0
fi

make clean drop compile deploy postconf