const sdk = require('api')('https://api.example.com/query.json');

sdk.get('/anything', {foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
