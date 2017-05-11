module.exports.usage = `Logout the current user

Usage: api logout`;

const fs = require('fs');

const request = require('../lib/request');
const console = require('../utils/console');

const { credPath } = require('../utils/utils');

module.exports.run = () => {
  return request.post('/logout').then(() => {
    console.log('You have been logged out.');

    try {
      fs.unlinkSync(credPath);
    } catch (e) {
      //
    }
  });
};
