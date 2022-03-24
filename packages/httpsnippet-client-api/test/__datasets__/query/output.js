const sdk = require('api')('https://api.example.com/query.json');

sdk.get('/anything', {foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
