const Enquirer = require('enquirer');
const list = require('prompt-list');
const password = require('prompt-password');
const message = require('./prompt-message');

module.exports = function createEnquirer() {
  const enquirer = new Enquirer();

  enquirer.register('list', list);
  enquirer.register('password', password);
  enquirer.register('message', message);

  return enquirer;
};
