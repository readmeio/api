const sdk = require('api')('https://api.example.com/short.json');

sdk.getAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
