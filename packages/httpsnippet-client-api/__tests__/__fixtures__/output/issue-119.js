const sdk = require('api')('https://example.com/openapi.json');
sdk.auth('123');

sdk['find/pets-by-status']({status: 'available'})
  .then(json => console.log(json))
  .catch(err => console.error(err));
