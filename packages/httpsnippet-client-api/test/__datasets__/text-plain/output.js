import sdk from '@api/text-plain';

sdk.postAnything('Hello World')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
