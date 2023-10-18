import sdk from '@api/multipart-form-data';

sdk.postAnything({foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
