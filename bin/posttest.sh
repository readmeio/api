#!/bin/bash
nyc report --reporter=text-summary
nyc check-coverage --statements 30 --branches 20 --functions 10 --lines 30

if [[ $? == 1 ]]; then
  echo 'To see the test coverage report: \n\n  nyc report --reporter=html && open coverage/index.html\n';
  exit 1
fi
