const sdk = require('api')('https://api.example.com/full-many-query-params.json');

sdk.postAnything({
  foo: 'bar',
  foo2: 'bar2',
  foo3: 'bar3',
  foo4: 'bar4'
}, {
  foo: ['bar', 'baz'],
  baz: 'abc',
  key: 'value',
  'bar-cookie': 'baz',
  'foo-cookie': 'bar',
  accept: 'application/json'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
