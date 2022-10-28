const sdk = require('api')('https://api.example.com/issue-78.json');

sdk.getStoreOrderOrderidTrackingTrackingid({orderId: '1234', trackingId: '5678'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
