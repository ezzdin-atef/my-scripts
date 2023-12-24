#!/bin/bash

# Find and delete all .DS_Store files in the current directory and its subdirectories
find . -type f -name '.DS_Store' -exec rm -f {} +
echo "Deleted all .DS_Store files."
