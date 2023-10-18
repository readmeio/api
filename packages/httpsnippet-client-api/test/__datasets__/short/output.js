import sdk from '@api/short';

sdk.getAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
