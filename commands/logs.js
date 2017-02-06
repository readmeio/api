const aws = require('aws-sdk');
const clc = require('cli-color');

const kinesis = new aws.Kinesis({region: 'us-east-1'});

module.exports.run = function() {
  console.log(clc.green('Tailing logs...'));
  kinesis.describeStream({
    StreamName: 'test'
  }, function(err, data){
    const ShardId = data.StreamDescription.Shards[0].ShardId;
    kinesis.getShardIterator({
      ShardId,
      ShardIteratorType: 'LATEST',
      StreamName: 'test',
    }, (err, data) => {
      getRecords(data.ShardIterator)
    });
  });
}

function getRecords(ShardIterator) {
  kinesis.getRecords({
    ShardIterator,
  }, (err, data) => {
    const output = [];
    for(const log of data.Records) {
      console.log(clc.cyan(log.ApproximateArrivalTimestamp), bin2String(log.Data).replace(',', ' '));
    }
    getRecords(data.NextShardIterator);
  });
}

function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 10));
  }
  return result;
}
