const sdk = require('api')('https://example.com/openapi.json');
sdk.auth('123');

sdk.findPetsByStatus({status: 'available', Accept: 'application/xml'})
  .then(json => console.log(json))
  .catch(err => console.error(err));
