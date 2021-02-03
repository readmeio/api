const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: 'bar'}, {foo: ['bar', 'baz'], baz: 'abc', key: 'value', accept: 'application/json'})
  .then(json => console.log(json))
  .catch(err => console.error(err));
