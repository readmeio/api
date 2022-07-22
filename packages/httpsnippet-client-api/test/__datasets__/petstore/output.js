const sdk = require('api')('https://api.example.com/petstore.json');

sdk.auth('123');
sdk.findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
