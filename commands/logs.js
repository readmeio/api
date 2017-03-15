const clc = require('cli-color');
const Primus = require('primus');
const getCredentials = require('../utils/utils').getCredentials;

const Socket = Primus.createSocket();
const client = Socket('ws://staging.bips.tech');

module.exports.run = () => {
  console.log(clc.green('Tailing logs...'));

  client.on('open', () => {
    client.write({ action: 'join', room: getCredentials().key });
  });

  client.on('data', (data) => {
    console.log(data);
  });

  client.on('end', () => {
    client.end();
  });

  client.on('error', () => {
    client.end();
  });
};
