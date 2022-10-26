const sdk = require('api')('https://api.example.com/http-insecure.json');

sdk.getAnything()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
