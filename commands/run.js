module.exports.usage = `Run a service remotely

Usage: api run <service> <action> [--team <team>]

--team is used to designate which team you would like to run this action against.
This roughly equates to which API key we will use when invoking the service.
You may have access to some services from only certain teams, so this is important.

The team defaults to your personal user team.
`;

const request = require('../lib/request');
const utils = require('../utils/utils');
const console = require('../utils/console');
const invoke = require('../lib/invoke');

module.exports.aliases = ['invoke'];

module.exports.category = 'using';
module.exports.weight = 1;

module.exports.run = (args, opts) => {
  if (!args[1]) throw new Error('Missing service');
  if (!args[2]) throw new Error('Missing action');

  const data = {};
  let service = args[1];
  const action = args[2];
  const passedData = utils.parseArgs(args.splice(3));
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

  return request.get('/users/me').then(response => JSON.parse(response)).then((user) => {
    let team = user.teams.find(t => t.personal);
    if (opts.team) {
      team = user.teams.find(t => t.name === opts.team);
    }

    if (!team) {
      console.log(`Cannot find team ${opts.team}`.red);
      return Promise.reject(new Error(`Cannot find team ${opts.team}`));
    }

    if (service.indexOf('/') > -1 && !service.startsWith('@')) {
      service = `@${service}`;
    }

    return invoke(team.key, service, action, data).then((response) => {
      console.log(response.body);
    }).catch((err) => {
      try {
        if (opts.json) {
          console.log(err.response.body);
        } else {
          console.error(err.response.body.error.red);
        }
      } catch (e) {
        console.error('Unexpected error occured'.red);
      }
    });
  });
};
