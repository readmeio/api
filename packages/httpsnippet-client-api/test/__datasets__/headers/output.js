import sdk from '@api/headers';

sdk.getAnything({'x-foo': 'Bar', 'x-bar': 'foo'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
