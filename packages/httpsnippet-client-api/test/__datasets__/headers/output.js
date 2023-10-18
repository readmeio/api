import sdk from '@api/headers';

sdk.getAnything({'x-foo': 'Bar', 'x-bar': 'foo', reqKey: 'baz'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
