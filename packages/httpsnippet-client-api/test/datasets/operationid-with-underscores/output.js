const sdk = require('api')('https://api.example.com/operationid-with-underscores.json');

sdk.anything_Operation()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
