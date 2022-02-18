const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: 'bar'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
