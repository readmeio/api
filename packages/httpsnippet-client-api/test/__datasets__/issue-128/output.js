const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('authKey\'With\'Apostrophes');
sdk.getItem({Accept: 'application/xml'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
