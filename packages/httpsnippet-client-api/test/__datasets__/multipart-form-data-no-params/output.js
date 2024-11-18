import multipartFormDataNoParams from '@api/multipart-form-data-no-params';

multipartFormDataNoParams.postAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
