import sdk from '@api/jsonObj-null-value';

sdk.postAnything({foo: null})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
