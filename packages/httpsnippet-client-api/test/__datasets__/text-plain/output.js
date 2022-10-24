const sdk = require('api')('https://api.example.com/text-plain.json');

sdk.postAnything('Hello World')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
