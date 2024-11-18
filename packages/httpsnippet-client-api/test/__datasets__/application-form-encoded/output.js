import applicationFormEncoded from '@api/application-form-encoded';

applicationFormEncoded.postAnything({foo: 'bar', hello: 'world'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
