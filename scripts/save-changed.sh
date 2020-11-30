#!/bin/bash

# 用服务器端持续集成构建多页面应用，保存页面记录
# 注：在 sync-changed.sh 执行成功之后再执行此脚本
# sh save-changed.sh

# 根目录（不能带斜杠）
ROOT_DIR='src'
# 缓存目录
CACHE_DIR='.cache'

set -e

# 用换行符分隔，每行（entry:size）
recordFile="${CACHE_DIR}/entries-record.txt"
entriesRecord=''

function run(){
  rootLength=${#ROOT_DIR}

  for el in `ls $1`; do
    f="${1}/${el}"

    if [ -d $f ]; then
      if [[ -f "${f}/index.html" && -f "${f}/index.js" ]]; then
        entry=${f:$rootLength+1}
        size=`du -sk $f | awk '{print $1}'`

        entriesRecord="${entriesRecord}${entry}:${size}\n"
      fi
      run $f
    fi
  done

  if [ ! -d $CACHE_DIR ]; then
    mkdir $CACHE_DIR
  fi
  printf $entriesRecord > $recordFile
}

run $ROOT_DIR

echo 'Save changed entries succeeded.'
