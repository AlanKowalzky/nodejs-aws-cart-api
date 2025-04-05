#!/bin/bash

username=$(echo $RANDOM | md5sum | head -c 16)
password=$1

if