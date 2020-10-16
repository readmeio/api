const sdk = require('api')('https://example.com/openapi.json');
sdk.auth('a5a220e');

sdk.findPetsByStatus({status: 'available', Accept: 'application/xml'})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
