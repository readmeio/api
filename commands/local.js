module.exports.usage = `Run a service locally

Usage: api local <endpoint> [arg1=val1, arg2=val2...argn=valn]

Runs your api locally. Useful for testing changes before deploying`;

module.exports.category = 'using';
module.exports.weight = 2;

const Stream = require('stream');
const fileType = require('file-type');

const utils = require('../utils/utils');
const handler = require('../utils/handler');

module.exports.aliases = ['invoke-local', 'dev'];

module.exports.run = async (args) => {
  const data = utils.parseArgs(args.splice(2));

  for (const d in data) {
    if (data[d] instanceof Stream) {
      const file = await utils.streamToBuffer(data[d]); // eslint-disable-line no-await-in-loop

      data[d] = {
        file: JSON.parse(JSON.stringify(file)),
        type: fileType(file).ext,
      };
    }
  }

  const errors = utils.buildErrors();

  const event = {
    name: args[1],
    data,
    errors,
  };

  handler.go(event, undefined, (err, response) => {
    if (err) {
      const parsedError = JSON.parse(err);
      console.log(parsedError);
    } else if (Buffer.isBuffer(response)) {
      process.stdout.write(response);
    } else {
      console.log(response);
    }
  });
};
