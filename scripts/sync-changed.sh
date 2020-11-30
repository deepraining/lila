#!/bin/bash

# 用服务器端持续集成构建多页面应用，同步页面到目标机器
# sh sync-changed.sh

# 根目录（不能带斜杠）
ROOT_DIR='src'
# 缓存目录
CACHE_DIR='.cache'

set -e

# 用换行符分隔，每行（entry:size）
recordFile="${CACHE_DIR}/entries-record.txt"
entriesRecord=''

if [ -f $recordFile ]; then
  entriesRecord=$(cat $recordFile)
fi

# 查看某个entry是否改变
# changed entry size
function changed() {
  if [ -z "$entriesRecord" ]; then
    return true
  fi

  for line in $entriesRecord; do
    if [ -z "$line" ]; then
      continue
    fi
    lineEntry=`echo ${line//:/ } | awk '{print $1}'`
    lineSize=`echo ${line//:/ } | awk '{print $2}'`

    if [ $1 == $lineEntry ]; then
      if [ $2 == $lineSize ]; then
        return false;
      else
        return true;
      fi
    fi
  done
  return true;
}

rootLength=${#ROOT_DIR}
changedEntries=''

function run(){
  for el in `ls $1`; do
    f="${1}/${el}"

    if [ -d $f ]; then
      if [[ -f "${f}/index.html" && -f "${f}/index.js" ]]; then
        entry=${f:$rootLength+1}
        size=`du -sb $f | awk '{print $1}'`

        # 查看entry是否改变
        entryChanged=0
        if [ ! -z "$entriesRecord" ]; then
          for line in $entriesRecord; do
            if [ -z "$line" ]; then
              continue
            fi

            lineEntry=`echo ${line//:/ } | awk '{print $1}'`
            lineSize=`echo ${line//:/ } | awk '{print $2}'`

            if [ $entry == $lineEntry ]; then
              if [ $size == $lineSize ]; then
                entryChanged=1
              fi
              break;
            fi
          done
        fi

        # 改变
        if [ $entryChanged -eq 0 ]; then
          changedEntries="${changedEntries} ${entry}"
        fi
      fi
      run $f
    fi
  done
}

function main() {

  run $ROOT_DIR

  if [ -z "$changedEntries" ]; then
    echo 'No changed entries.'
    exit 1
  fi

  echo "Changed entries: $changedEntries"

  for entryToBuild in $changedEntries; do
    npx lila sync $entryToBuild
  done

  echo "All changed entries sync succeeded."
}

main
