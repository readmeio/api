const sdk = require('api')('https://api.example.com/petstore.json');

sdk.auth('123');
sdk.findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
