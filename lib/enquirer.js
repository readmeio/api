const Enquirer = require('enquirer');
const list = require('prompt-list');

module.exports = function createEnquirer() {
  const enquirer = new Enquirer();

  enquirer.register('list', list);

  return enquirer;
};
