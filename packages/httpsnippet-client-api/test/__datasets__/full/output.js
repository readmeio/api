import sdk from '@api/full';

sdk.postAnything({foo: 'bar'}, {
  foo: ['bar', 'baz'],
  baz: 'abc',
  key: 'value',
  'bar-cookie': 'baz',
  'foo-cookie': 'bar'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
