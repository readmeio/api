import sdk from '@api/full-many-query-params';

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
  'foo-cookie': 'bar'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
