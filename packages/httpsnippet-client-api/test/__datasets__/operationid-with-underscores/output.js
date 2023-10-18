import sdk from '@api/operationid-with-underscores';

sdk.anything_Operation()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
