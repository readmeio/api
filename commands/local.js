module.exports.usage = `Run a service locally

Usage: api local <action> [arg1=val1, arg2=val2...argn=valn]

Runs your api locally. Useful for testing changes before deploying`;

const path = require('path');

const utils = require('../utils/utils');

const packageJson = require('../lib/package-json')();
const handler = require('../utils/handler-local');

module.exports.aliases = ['invoke-local', 'dev'];

module.exports.run = (args) => {
  const data = {};
  const passedData = utils.parseArgs(args.splice(2));
  for (const arg of passedData) {
    const i = arg.indexOf('=');
    const parsedArg = [arg.slice(0, i), arg.slice(i + 1)];
    let value = parsedArg[1];
    try {
      value = JSON.parse(parsedArg[1]);
    } catch (e) {
      // Already in proper format
      // console.log(e);
    }
    data[parsedArg[0]] = value;
  }
  const p = path.join(process.cwd(), packageJson.get('main'));
  const event = {
    entrypoint: p,
    name: args[1],
    data,
  };

  handler.go(event, undefined, (err, response) => {
    if (err) {
      const parsedError = JSON.parse(err);
      console.log(parsedError);
    } else {
      console.log(response);
    }
  });
};
