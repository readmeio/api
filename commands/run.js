const request = require('request-promise');

const utils = require('../utils/utils');

module.exports.aliases = ['invoke'];

module.exports.run = (args, opts) => {
  const data = {};
  const service = args[1];
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

  const jar = utils.getJar();
  request.get(`${utils.BUILD_URL}/users/me`, { jar }).then((user) => {
    const parsedUser = JSON.parse(user);
    let team = parsedUser.teams[0];
    if (opts.team) {
      team = parsedUser.teams.find(t => t.name === opts.team);
    }

    if (!team) {
      console.log(`Cannot find team ${opts.team}`.red);
      return;
    }
    const key = team.key;
    const keyUrl = utils.getKeyUrl(key);
    const invokeUrl = `${keyUrl}/services/${service}/${action}/invoke`;
    request.post(invokeUrl, { json: data }).then((response) => {
      console.log(response.result);
    }).catch((err) => {
      console.log(err.error.message.red);
    });
  });
};
