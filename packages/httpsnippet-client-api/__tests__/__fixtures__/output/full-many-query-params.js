const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {
  foo: 'bar',
  foo2: 'bar2',
  foo3: 'bar3',
  foo4: 'bar4'
}, {
  foo: ['bar', 'baz'],
  baz: 'abc',
  key: 'value',
  accept: 'application/json'
})
  .then(res => console.log(res))
  .catch(err => console.error(err));
