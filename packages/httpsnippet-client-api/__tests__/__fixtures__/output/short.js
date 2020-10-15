const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/har')
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
