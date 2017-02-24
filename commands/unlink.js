const exists = require('../utils/utils').fileExists;
const path = require('path');
const fs = require('fs');

const localLinksPath = path.join(process.cwd(), '/node_modules/api/data/links.json');

module.exports.run = (args) => {
  const localLinks = exists(localLinksPath) ? require(localLinksPath) : {};
  delete localLinks[args[1]];
  fs.writeFile(localLinksPath, JSON.stringify(localLinks), (err) => {
    if (err) console.error(err);
    console.log(`${args[1]} unlinked`);
  });
};
