module.exports.usage = `Sets a secret for a build service

Usage: api secret key=value`;

const request = require('request-promise');

const utils = require('../utils/utils');
const exit = require('../utils/exit');
const console = require('../utils/console');

module.exports.run = ([_, service, secret], opts) => {
  if (!service) {
    console.error('You must provide a service');

    return exit(1);
  }

  if (!secret) {
    console.error('You must provide a secret in the form of key=value');

    return exit(1);
  }

  const jar = utils.getJar();
  const base = utils.BUILD_URL;
  const body = {
    key: secret.split('=')[0],
    value: secret.split('=')[1],
  };
  if (opts.team) body.team = opts.team;
  return request.post(`${base}/secrets/${service}`, {
    json: true,
    jar,
    body,
  }).then(console.log).catch(console.error);
};
