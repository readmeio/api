const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/har', {foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
