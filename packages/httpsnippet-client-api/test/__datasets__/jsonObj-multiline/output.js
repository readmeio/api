import sdk from '@api/jsonObj-multiline';

sdk.postAnything({foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
