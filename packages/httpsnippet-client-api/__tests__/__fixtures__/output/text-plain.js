const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', 'Hello World')
  .then(json => console.log(json))
  .catch(err => console.error(err));
