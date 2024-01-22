#!/bin/bash

digits=12       # number of digits in final number
a=$(date +%s)
b=$((a*RANDOM))

while [ ${#b} -lt 12 ]; do
    b="${b}$RANDOM"
done

echo "${b:0:digits}"