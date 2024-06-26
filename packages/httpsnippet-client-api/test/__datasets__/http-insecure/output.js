import httpInsecure from '@api/http-insecure';

httpInsecure.getAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
