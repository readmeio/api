const sdk = require('api')('https://api.example.com/operationid-non-alphanumerical.json');

sdk.auth('123');
sdk.findPetsByStatus({status: 'available'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
