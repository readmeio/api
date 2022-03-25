const sdk = require('api')('https://api.example.com/issue-78-operationid.json');

sdk.getOrder({orderId: '1234'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
