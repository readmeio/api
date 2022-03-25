const sdk = require('api')('https://api.example.com/issue-78.json');

sdk.get('/store/order/1234/tracking/5678')
  .then(res => console.log(res))
  .catch(err => console.error(err));
