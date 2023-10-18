import sdk from '@api/http-insecure';

sdk.getAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
