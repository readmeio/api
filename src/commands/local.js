module.exports.usage = `Run a service locally

Usage: api local <endpoint> [arg1=val1, arg2=val2...argn=valn]

Runs your api locally. Useful for testing changes before deploying`;

module.exports.category = 'using';
module.exports.weight = 2;

const utils = require('../utils/utils');
const { convertToFileType } = require('../utils/file-utils');
const handler = require('../utils/handler');

module.exports.aliases = ['invoke-local', 'dev'];

module.exports.run = async (args) => {
  let data = utils.parseArgs(args.splice(2));

  data = await convertToFileType(data);

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
