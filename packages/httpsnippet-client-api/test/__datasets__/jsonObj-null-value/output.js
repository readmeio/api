const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/anything', {foo: null})
  .then(res => console.log(res))
  .catch(err => console.error(err));
