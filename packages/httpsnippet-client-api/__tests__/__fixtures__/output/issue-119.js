const sdk = require('api')('https://example.com/openapi.json');
sdk.auth('123');

sdk['find/pets-by-status']({status: 'available'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
