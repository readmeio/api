const request = require('request-promise');
const path = require('path');
require('colors');

const cred = require('../data/creds.json');

const pjson = require(path.join(process.cwd(), 'package.json'));

module.exports.aliases = ['list'];

module.exports.run = (args) => {
  if (args.length === 1) {
    console.log('listing all deployed services');
  } else if (args[1] === 'versions') {
    request.get(`http://${cred['mjcuva@gmail.com'].key}:@localhost:5000/services/${pjson.name}`).then((response) => {
      const service = JSON.parse(response);
      const versions = getVersions(service);
      console.log(`Listing deployed versions for ${pjson.name}`.blue);
      for (const version of versions) {
        console.log(version);
      }
    });
  }
};

function getVersions(service) {
  const versions = service.versions;
  const out = [];
  for (const v of versions) {
    out.push(v.semver);
  }
  return out;
}
