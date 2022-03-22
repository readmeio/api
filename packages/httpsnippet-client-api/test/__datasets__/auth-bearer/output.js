const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('myBearerToken');
sdk.post('/bearer')
  .then(res => console.log(res))
  .catch(err => console.error(err));
