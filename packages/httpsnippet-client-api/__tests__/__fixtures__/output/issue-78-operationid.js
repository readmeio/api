const sdk = require('api')('https://example.com/openapi.json');

sdk.getOrder({orderId: '1234', Accept: 'application/xml'})
  .then(json => console.log(json))
  .catch(err => console.error(err));
