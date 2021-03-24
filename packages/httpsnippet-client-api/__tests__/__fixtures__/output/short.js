const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/har')
  .then(res => console.log(res))
  .catch(err => console.error(err));
