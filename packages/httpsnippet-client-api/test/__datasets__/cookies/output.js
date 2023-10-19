import sdk from '@api/cookies';

sdk.postAnything({bar: 'baz', foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
