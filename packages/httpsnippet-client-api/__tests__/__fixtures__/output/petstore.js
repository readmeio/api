const sdk = require('api')('https://example.com/openapi.json');
sdk.auth('123');

sdk.findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
