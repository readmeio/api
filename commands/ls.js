const path = require('path');
require('colors');
const utils = require('../utils/utils');
const request = require('request-promise');

const pjsonPath = path.join(process.cwd(), 'package.json');
const exists = require('../utils/utils').fileExists;

module.exports.aliases = ['list'];

module.exports.run = (args) => {
  const jar = utils.getJar();
  const base = utils.BUILD_URL;
  if (args.length === 1) {
    request.get(`${base}/services/deployed`, { jar }).then((response) => {
      const services = JSON.parse(response);
      console.log('Listing deployed services'.blue);
      for (const service in services) {
        console.log(service);
      }
    });
  } else if (args[1] === 'versions') {
    const pjson = exists(pjsonPath) ? require(pjsonPath) : {};
    request.get(`${base}/services/${pjson.name}`, { jar }).then((response) => {
      const service = JSON.parse(response);
      const versions = getVersions(service);
      console.log(`Listing deployed versions for ${pjson.name}`.blue);
      for (const version of versions) {
        console.log(version);
      }
    }).catch(() => {
      console.log(`Service "${pjson.name}" is not deployed`.red);
    });
  } else if (args[1] === 'used') {
    request.get(`${base}/services/used`, { jar }).then((response) => {
      const services = JSON.parse(response);
      console.log('Listing used services'.blue);
      for (const name in services) {
        console.log(`${name} v${services[name].version.version}`);
      }
    });
  }
};

function getVersions(service) {
  const versions = service.versions;
  const out = [];
  for (const v of versions) {
    out.push(v.version);
  }
  return out;
}
