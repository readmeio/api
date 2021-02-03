const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: 'bar', hello: 'world'})
  .then(json => console.log(json))
  .catch(err => console.error(err));
