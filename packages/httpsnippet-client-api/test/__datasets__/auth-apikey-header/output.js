const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('a5a220e');
sdk.put('/apiKey')
  .then(res => console.log(res))
  .catch(err => console.error(err));
