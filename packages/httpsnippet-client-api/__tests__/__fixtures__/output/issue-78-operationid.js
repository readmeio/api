const sdk = require('api')('https://example.com/openapi.json');

sdk.getOrder({orderId: '1234', accept: 'application/xml'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
