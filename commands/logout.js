module.exports.usage = `Logout the current user

Usage: api logout`;

const path = require('path');
const fs = require('fs');

const request = require('../lib/request');
const console = require('../utils/console');

const credPath = path.join(__dirname, '..', 'data/creds.json');

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
