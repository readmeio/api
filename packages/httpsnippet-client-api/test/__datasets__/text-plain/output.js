import textPlain from '@api/text-plain';

textPlain.postAnything('Hello World')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
