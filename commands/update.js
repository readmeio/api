const request = require('request-promise');
require('colors');

const utils = require('../utils/utils');

module.exports.run = (args, opts) => {
  if (!args[1]) {
    console.log('Please include a service you want to upgrade!');
  } else if (!opts.team) {
    console.log('Please include the team with --team');
  } else {
    const jar = utils.getJar();
    request.put(`${utils.BUILD_URL}/services/${opts.team}/${args[1]}/update`, { jar }).then((s) => {
      const service = JSON.parse(s);
      console.log(`${args[1]} updated to version ${service.version.green}`);
    });
  }
};
