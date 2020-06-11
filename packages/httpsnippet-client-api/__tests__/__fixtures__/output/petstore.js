const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('123').get('/v2/pet/findByStatus', {status: 'available', accept: 'application/xml'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
