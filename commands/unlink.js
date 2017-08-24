module.exports.usage = `Remove linked services

Usage:
  api unlink # Removes all local links from service in current directory
  api unlink math # Removes local link to math service in current directory
`;

module.exports.category = 'utility';

const utils = require('../utils/utils');
const path = require('path');
const fs = require('fs');

const packageJson = require('../lib/package-json');

module.exports.run = (args) => {
  const linksPath = path.join(utils.sharedDirectoryPath(), 'links.json');
  const links = utils.fileExists(linksPath) ? require(linksPath) : {};

  const pjsonName = packageJson().get('name');

  // Don't want service to be linked anymore
  if (args.length === 1) {
    delete links.linkedServices[pjsonName];
    for (const p in links.localLinks) {
      links.localLinks[p] = links.localLinks[p].filter(s => s !== pjsonName);
    }
    console.log(`Removed ${pjsonName.green} from links`);
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
