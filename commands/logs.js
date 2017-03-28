require('colors');
const Primus = require('primus');
const request = require('request-promise');

const utils = require('../utils/utils');

const Socket = Primus.createSocket();
const client = Socket(utils.WS_URL);

module.exports.run = () => {
  const jar = utils.getJar();

  client.on('open', () => {
    console.log('Tailing logs...'.green);
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
