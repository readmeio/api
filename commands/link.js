/* Link file format:

  ~/.readme-build/links.json

  {
    services: { // Services linked globally that are available
      math: '~/Desktop/math/',
    },
    directories: { // Services that the consumer have linked
      '~/Desktop/consumer/': ['math'],
    },
  }
*/


module.exports.usage = `Run services in code from local computer

Usage:
  api link # Allows service to be run locally from code
  api link math # Allows service math to be run from current directory
`;

module.exports.category = 'utility';

const utils = require('../utils/utils');
const path = require('path');
const fs = require('fs');

const packageJson = require('../lib/package-json');

module.exports.baseLinks = { services: {}, directories: {} };

module.exports.run = (args) => {
  // Creates .readme-build in the home directory if it doesn't exist
  utils.setupSharedDirectory();

  const linksPath = path.join(utils.sharedDirectoryPath(), 'links.json');

  const pjsonName = packageJson().get('name');

  const links = utils.fileExists(linksPath) ? require(linksPath) : module.exports.baseLinks;

  // Setting up linked service `api link`
  if (args.length === 1) {
    links.services[pjsonName] = process.cwd();
    try {
      fs.writeFileSync(linksPath, JSON.stringify(links));
      console.log('Local link added!');
      const greenString = `api link ${pjsonName}`.green;
      console.log(`Run ${greenString} to use in another project`);
    } catch (err) {
      console.error(err);
    }
  } else if (links.services[args[1]]) { // check we know about service trying to be linked
    if (!links.directories[process.cwd()]) {
      links.directories[process.cwd()] = [];
    }
    links.directories[process.cwd()].push(args[1]);
    try {
      fs.writeFileSync(linksPath, JSON.stringify(links));
      console.log(`Link added! Calls to ${args[1]} will be made locally.`);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log(`You need to run ${'`api link`'.green} in your service directory first!`); // TODO: come up with better message
  }
};
