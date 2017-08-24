const utils = require('../utils/utils');
const path = require('path');
const fs = require('fs');

const pjsonPath = path.join(process.cwd(), 'package.json');
const pjson = utils.fileExists(pjsonPath) ? require(pjsonPath) : {};
const linksPath = path.join(utils.sharedDirectoryPath, 'links.json');

module.exports.run = (args) => {
  const links = utils.fileExists(linksPath) ? require(linksPath) : {};

  // Don't want service to be linked anymore
  if (args.length === 1) {
    delete links.linkedServices[pjson.name];
    for (const p in links.localLinks) {
      links.localLinks[p] = links.localLinks[p].filter(s => s !== pjson.name);
    }
    console.log(`Removed ${pjson.name.green} from links`);
  } else { // unlink service from consumer
    for (const p in links.localLinks) {
      links.localLinks[p] = links.localLinks[p].filter(s => s !== args[1]);
    }
    console.log(`Removed ${args[1]} from links`);
  }
  fs.writeFile(linksPath, JSON.stringify(links), (err) => {
    if (err) console.error(err);
  });
};
