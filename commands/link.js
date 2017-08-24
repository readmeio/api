const utils = require('../utils/utils');
const path = require('path');
const fs = require('fs');

const pjsonPath = path.join(process.cwd(), 'package.json');
const pjson = utils.fileExists(pjsonPath) ? require(pjsonPath) : {};

const linksPath = path.join(utils.sharedDirectoryPath, 'links.json');
const baseLinks = { linkedServices: {}, localLinks: {} };

module.exports.run = (args) => {
  // Creates .readme-build in the home directory if it doesn't exist
  utils.setupSharedDirectory();

  const links = utils.fileExists(linksPath) ? require(linksPath) : baseLinks;

  // Setting up linked service `api link`
  if (args.length === 1) {
    links.linkedServices[pjson.name] = process.cwd();
    fs.writeFile(linksPath, JSON.stringify(links), (err) => {
      if (err) console.error(err);
      console.log('Local link added!');
      const greenString = `api link ${pjson.name}`.green;
      console.log(`Run ${greenString} to use in another project`);
    });
  } else if (links.linkedServices[args[1]]) { // check we know about service trying to be linked
    if (!links.localLinks[process.cwd()]) {
      links.localLinks[process.cwd()] = [];
    }
    links.localLinks[process.cwd()].push(args[1]);
    fs.writeFile(linksPath, JSON.stringify(links), (err) => {
      if (err) console.error(err);
      console.log(`Link added! Calls to ${args[1]} will be made locally.`);
    });
  } else {
    console.log(`You need to run ${'`api link`'.green} in your service directory first!`); // TODO: come up with better message
  }
};
