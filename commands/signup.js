module.exports.usage = `Signup to Build

Usage: api signup`;
module.exports.weight = 2;

module.exports.category = 'utility';

const login = require('./login');

module.exports.run = login.run;
