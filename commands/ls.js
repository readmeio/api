const path = require('path');
require('colors');
const request = require('../lib/request');

const pjsonPath = path.join(process.cwd(), 'package.json');
const exists = require('../utils/utils').fileExists;

module.exports.aliases = ['list'];

module.exports.run = (args) => {
  if (args.length === 1) {
    request.get('/services/deployed').then((response) => {
      const services = JSON.parse(response);
      console.log('\nListing deployed services'.green);
      for (const team in services) {
        console.log(`\n${team.blue}`);
        for (const service in services[team]) {
          console.log(`  ${service}`);
        }
      }
    });
  } else if (args[1] === 'versions') {
    const pjson = exists(pjsonPath) ? require(pjsonPath) : {};
    request.get(`/services/${pjson.name}`).then((response) => {
      const service = JSON.parse(response);
      const versions = service.versions;
      console.log(`Listing deployed versions for ${pjson.name}`.blue);
      for (const version of versions) {
        console.log(version);
      }
    }).catch(() => {
      console.log(`Service "${pjson.name}" is not deployed`.red);
    });
  } else if (args[1] === 'used') {
    request.get('/services/used').then((response) => {
      const services = JSON.parse(response);
      console.log('\nListing used services'.green);
      for (const team in services) {
        console.log(`\n${team.blue}`);
        for (const name in services[team]) {
          console.log(`  ${name} v${services[team][name].version.version}`);
        }
      }
    });
  }
};
