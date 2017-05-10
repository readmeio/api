module.exports.usage = `List deployed/versions/used from the server

Usage:
  api ls # Returns deployed services by team
  api ls versions # Returns deployed versions of this service
  api ls used # Returns versions that you are using
`;

require('colors');
const request = require('../lib/request');

const packageJson = require('../lib/package-json')();

module.exports.aliases = ['list'];

module.exports.run = (args) => {
  if (args.length === 1) {
    request.get('/services/deployed').then((response) => {
      const teams = JSON.parse(response);
      console.log('\nListing deployed services by team'.green);
      for (const team in teams) {
        console.log(`\n${team.blue}`);
        for (const service in teams[team]) {
          console.log(`  ${service}`);
        }
      }
    });
  } else if (args[1] === 'versions') {
    request.get(`/services/${packageJson.get('name')}`).then((response) => {
      const service = JSON.parse(response);
      const versions = service.versions;
      console.log(`Listing deployed versions for ${packageJson.get('name')}`.blue);
      for (const version of versions) {
        console.log(version.version);
      }
    }).catch(() => {
      console.log(`Service "${packageJson.get('name')}" is not deployed`.red);
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
