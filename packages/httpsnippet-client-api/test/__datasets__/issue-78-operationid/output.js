const sdk = require('api')('https://api.example.com/issue-78-operationid.json');

sdk.getOrder({orderId: '1234'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
