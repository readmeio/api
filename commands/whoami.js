module.exports.usage = `Returns the current logged in user

Usage: api whoami`;

const request = require('../lib/request');
const console = require('../utils/console');

module.exports.run = () => {
  return request.get('/users/me').then((response) => {
    try {
      console.log(JSON.parse(response).username);
    } catch (e) {
      //
    }
  });
};
