const sdk = require('.')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/readme.json');

sdk
  .auth('readmeApiToken')
  .getChangelogs({
    perPage: 10,
    page: 1,
  })
  .then(res => {
    console.log(`there are ${res.length} changelogs`);
    console.log(res[0]);
  })
  .catch(console.error);
