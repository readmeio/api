const request = require('request-promise');
require('colors');
const inquirer = require('inquirer');

const utils = require('../utils/utils');

module.exports.run = (args, opts) => {
  if (!args[1]) {
    console.log('Please include a service you want to upgrade!');
  } else {
    const jar = utils.getJar();
    const json = {};
    if (opts.team) json.team = opts.team;
    request.put(`${utils.BUILD_URL}/services/${args[1]}/update`, { jar, json }).then((s) => {
      console.log(`${args[1]} updated to version ${s.version.green}`);
    }).catch((e) => {
      if (e.error.code === 'TeamSelectionRequired') {
        const teamQ = {
          type: 'list',
          name: 'team',
          message: 'Which team should be updated?',
          choices: e.error.data.teams,
        };
        inquirer.prompt([teamQ]).then(results => module.exports.run(args, results));
      }
    });
  }
};

