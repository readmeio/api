const sdk = require('api')('https://api.example.com/full.json');

sdk.postAnything({foo: 'bar'}, {
  foo: ['bar', 'baz'],
  baz: 'abc',
  key: 'value',
  'bar-cookie': 'baz',
  'foo-cookie': 'bar',
  accept: 'application/json'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
