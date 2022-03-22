const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('buster');
sdk.post('/apiKey')
  .then(res => console.log(res))
  .catch(err => console.error(err));
