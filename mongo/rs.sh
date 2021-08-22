#!/bin/bash

echo "prepare rs initiating"

check_db_status() {
  mongo1=$(mongo --host mongodb --port 27017 --eval "db.stats().ok" | tail -n1 | grep -E '(^|\s)1($|\s)')
  if [[ $mongo1 == 1 ]]; then
    init_rs
  else
    check_db_status
  fi
}

init_rs() {
  ret=$(mongo --host mongodb --port 27017 --eval "rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: 'mongodb:27017' }] })")
}

check_db_status

echo "rs initiating finished"
exit 0