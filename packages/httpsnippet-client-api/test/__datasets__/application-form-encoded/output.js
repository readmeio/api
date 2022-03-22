const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/anything', {foo: 'bar', hello: 'world'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
