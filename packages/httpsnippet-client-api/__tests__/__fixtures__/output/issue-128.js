const sdk = require('api')('https://example.com/openapi.json');
sdk.auth('authKey\'With\'Apostrophes');

sdk.getItem({Accept: 'application/xml'})
  .then(json => console.log(json))
  .catch(err => console.error(err));
