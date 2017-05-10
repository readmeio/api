module.exports.usage = `Update the used version of this service

Usage: api update <service> [<version>] [--team <team>]

The version is optional, and will by default update you to the latest.
--team is used to designate which team you would like to update
`;

require('colors');
const createEnquirer = require('../lib/enquirer');
const request = require('../lib/request');
const console = require('../utils/console');
const { prefixName } = require('../lib/invoke');

const enquirer = createEnquirer();

module.exports.run = (args, opts) => {
  if (!args[1]) throw new Error('Please include a service you want to upgrade!');
  if (!args[2]) console.log('No version specified, updating to latest');

  return request.put(`/services/${prefixName(args[1])}/update`, {
    json: { version: args[2], team: opts.team },
    defaultErrorHandler: false,
  }).then((s) => {
    console.log(`${args[1]} updated to version ${s.version.green}`);
  }).catch((e) => {
    if (e.error.code === 'TeamSelectionRequired') {
      enquirer.ask([{
        type: 'list',
        name: 'team',
        message: 'Which team should be updated?',
        choices: e.error.data.teams,
      }]).then(results => module.exports.run(args, results));
    }
  });
};

