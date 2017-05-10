const request = require('request-promise');

const utils = require('../utils/utils');

module.exports.run = (args, opts) => {
  const jar = utils.getJar();
  const base = utils.BUILD_URL;
  const service = args[1];
  const body = {
    key: args[2].split('=')[0],
    value: args[2].split('=')[1],
  };
  if (opts.team) body.team = opts.team;
  request.post(`${base}/secrets/${service}`, {
    json: true,
    jar,
    body,
  }).then(console.log).catch(console.error);
};
