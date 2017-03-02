const exists = require('../utils/utils').fileExists;
const path = require('path');
const fs = require('fs');

const pjsonPath = path.join(process.cwd(), 'package.json');
const pjson = exists(pjsonPath) ? require(pjsonPath) : {};

const localLinksPath = path.join(process.cwd(), '/node_modules/api/data/links.json');

const linkPath = path.join(__dirname, '..', 'data/links.json');

module.exports.run = (args) => {
  const links = exists(linkPath) ? require(linkPath) : {};
  if (args.length === 1) {
    links[pjson.name] = process.cwd();
    fs.writeFile(linkPath, JSON.stringify(links), (err) => {
      if (err) console.error(err);
      console.log('Local link added!');
      const greenString = `api link ${pjson.name}`.green;
      console.log(`Run ${greenString} to use in another project`);
    });
  } else {
    const localLinks = exists(localLinksPath) ? require(localLinksPath) : {};
    localLinks[args[1]] = links[args[1]];
    fs.writeFile(localLinksPath, JSON.stringify(localLinks), (err) => {
      if (err) console.error(err);
      console.log(`Link added! Calls to ${args[1]} will be made locally.`);
    });
  }
};
