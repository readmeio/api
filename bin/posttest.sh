#!/bin/bash
nyc report --reporter=text-summary
nyc check-coverage --statements 50 --branches 50 --functions 30 --lines 50

if [[ $? == 1 ]]; then
  echo 'To see the test coverage report: \n\n  nyc report --reporter=html && open coverage/index.html\n';
  exit 1
fi
