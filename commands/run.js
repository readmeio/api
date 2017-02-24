const path = require('path');

const handler = require(path.join(process.cwd(), 'handler.js'));
const pjson = require(path.join(process.cwd(), 'package.json'));

module.exports.aliases = ['invoke'];

module.exports.run = (args) => {
  const data = {};
  const passedData = parseArgs(args.splice(2));
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

  const event = {
    entrypoint: pjson.main,
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

// fixes args like numbers=[1, 3, 2]
// Spaces confuse minimist
function parseArgs(args) {
  const parsed = [];
  for (const arg of args) {
    const stringArg = arg.toString();
    if (stringArg.indexOf('=') === -1) {
      parsed[parsed.length - 1] += stringArg;
    } else {
      parsed.push(arg);
    }
  }
  return parsed;
}
