const path = require('path');
const fs = require('fs');
const exists = require('../utils/utils').fileExists;

const credPath = path.join(__dirname, '..', 'data/creds.json');

module.exports.run = () => {
  if (exists(credPath)) {
    fs.unlinkSync(credPath);
  }

  console.log('You have been logged out.');
};
