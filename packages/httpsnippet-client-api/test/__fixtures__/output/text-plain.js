const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', 'Hello World')
  .then(res => console.log(res))
  .catch(err => console.error(err));
