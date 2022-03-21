const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/anything', {foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
