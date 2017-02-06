const aws = require('aws-sdk');

const kinesis = new aws.Kinesis({region: 'us-east-1'});

function putRecord(log) {
  return function() {
    kinesis.putRecord({
      Data: [...arguments].toString(),
      StreamName: 'test',
      PartitionKey: '1'
    }, (err, data) => {
      log(...arguments);
    });
  }
}

console.log = putRecord(console.log);
console.assert = putRecord(console.assert);
console.debug = putRecord(console.debug);
console.dir = putRecord(console.dir);
console.error = putRecord(console.error);
console.exception = putRecord(console.exception);
console.info = putRecord(console.info);
console.table = putRecord(console.table);
console.trace = putRecord(console.trace);
console.warn = putRecord(console.warn);