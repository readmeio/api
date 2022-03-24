const sdk = require('api')('https://example.com/openapi.json');

sdk.getOrder({orderId: '1234'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
