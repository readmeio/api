const request = require('request-promise');
const path = require('path');
require('colors');
const getkey = require('../utils/utils').getKey;

const cred = require('../data/creds.json');

const pjsonPath = path.join(process.cwd(), 'package.json');
const exists = require('../utils/utils').fileExists;

module.exports.aliases = ['list'];

module.exports.run = (args) => {
  const key = getkey();
  if (args.length === 1) {
    request.get(`http://${key}:@localhost:5000/services/list-deployed`).then((response) => {
      const services = JSON.parse(response);
      console.log('Listing deployed services'.blue);
      for (const service of services) {
        console.log(service.name);
      }
    });
  } else if (args[1] === 'versions') {
    const pjson = exists(pjsonPath) ? require(pjsonPath) : {};
    request.get(`http://${key}:@localhost:5000/services/${pjson.name}`).then((response) => {
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
