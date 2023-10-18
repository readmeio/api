import sdk from '@api/application-form-encoded';

sdk.postAnything({foo: 'bar', hello: 'world'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
