// const path = require('path');
const sdk = require('./src')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/yaml/readme.yaml', {
  // Uncomment this line to load the SDK with a custom caching directory.
  // cacheDir: path.join(process.cwd(), '.api'),
});

sdk
  .getOpenRoles()
  .then(res => {
    console.log(`there are ${res.length} open roles`);
    console.log(res[0]);
  })
  .catch(console.error);
