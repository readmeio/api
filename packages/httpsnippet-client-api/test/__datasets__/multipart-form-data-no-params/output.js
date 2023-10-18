import sdk from '@api/multipart-form-data-no-params';

sdk.postAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
