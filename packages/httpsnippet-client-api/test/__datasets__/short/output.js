import short from '@api/short';

short.getAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
