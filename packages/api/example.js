const sdk = require('./src')('https://raw.githubusercontent.com/readmeio/oas/master/packages/examples/3.0/yaml/readme.yaml');

sdk
  .auth('readmeApiToken')
  .getChangelogs({
    perPage: 10,
    page: 1
  })
  .then(res => res.json())
  .then(res => {
    console.log(`there are ${res.length} changelogs`);
    console.log(res[0]);
  });
