const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/har', {foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(json => console.log(json))
  .catch(err => console.error(err));
