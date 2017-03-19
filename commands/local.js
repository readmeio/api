const path = require('path');

const utils = require('../utils/utils');

const pjsonPath = path.join(process.cwd(), 'package.json');
const pjson = utils.fileExists(pjsonPath) ? require(pjsonPath) : {};

const handler = require('../utils/handler-local');

module.exports.aliases = ['invoke-local'];

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
  const p = path.join(process.cwd(), pjson.main);
  const event = {
    entrypoint: p,
    name: args[1],
    data,
  };

  handler.go(event, undefined, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  });
};
