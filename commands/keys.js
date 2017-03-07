const creds = require('../data/creds.json');

module.exports.run = () => {
  for (const name in creds) {
    console.log(`${name.blue}: ${creds[name]}`);
  }
};
