'use strict';

const Primus = require('primus');

const Socket = Primus.createSocket();
let client;
let open = false;

module.exports.initLog = () => {
  if (!client) {
    client = new Socket('ws://b922805b.ngrok.io');
  }

  client.on('open', () => {
    open = true;
  });
};

module.exports.log = (log) => {
  const key = process.env.apiKey;
  if (key) {
    client.write({ room: key, msg: log });
  }
};

module.exports.close = () => {
  if (open) {
    client.end();
    open = false;
    client = undefined;
  } else {
    setTimeout(module.exports.close, 1000);
  }
};
