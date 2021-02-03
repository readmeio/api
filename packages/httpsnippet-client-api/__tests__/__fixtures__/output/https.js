const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/har')
  .then(json => console.log(json))
  .catch(err => console.error(err));
