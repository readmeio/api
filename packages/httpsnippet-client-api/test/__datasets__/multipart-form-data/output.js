import multipartFormData from '@api/multipart-form-data';

multipartFormData.postAnything({foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
