const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('a5a220e544b16e733f59e5fe681366dd').findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
