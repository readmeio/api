const clc = require('cli-color');
const Primus = require('primus');
const request = require('request-promise');

const utils = require('../utils/utils');

const Socket = Primus.createSocket();
const client = Socket('ws://staging.bips.tech');
// const client = Socket('ws://localhost:5000');

module.exports.run = () => {
  console.log(clc.green('Tailing logs...'));

  client.on('open', () => {
    const jar = utils.getJar();
    request(`${utils.BUILD_URL}/users/me`, { jar }).then((user) => {
      const parsedUser = JSON.parse(user);
      client.write({ action: 'join', room: parsedUser.teams[0]._id });
    });
  });

  client.on('data', (data) => {
    console.log.apply(undefined, data);
  });

  client.on('end', () => {
    client.end();
  });

  client.on('error', () => {
    client.end();
  });
};
