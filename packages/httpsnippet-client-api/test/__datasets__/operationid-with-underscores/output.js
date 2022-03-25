const sdk = require('api')('https://api.example.com/operationid-with-underscores.json');

sdk.anythingOperation()
  .then(res => console.log(res))
  .catch(err => console.error(err));
