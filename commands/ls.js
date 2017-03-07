const request = require('request-promise');
const path = require('path');
require('colors');
const utils = require('../utils/utils');

const pjsonPath = path.join(process.cwd(), 'package.json');
const exists = require('../utils/utils').fileExists;

module.exports.aliases = ['list'];

module.exports.run = (args) => {
  const creds = utils.getCredentials();
  const proxyUrl = utils.getProxyUrl(creds.key);
  if (args.length === 1) {
    request.get(`${proxyUrl}/services/${creds.teamName}/deployed`).then((response) => {
      const services = JSON.parse(response);
      console.log(`Listing deployed services for team ${creds.teamName}`.blue);
      for (const service of services) {
        console.log(service.name);
      }
    });
  } else if (args[1] === 'versions') {
    const pjson = exists(pjsonPath) ? require(pjsonPath) : {};
    request.get(`${proxyUrl}/services/${pjson.name}`).then((response) => {
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
    request.get(`${proxyUrl}/services/${creds.teamName}/used`).then((response) => {
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
