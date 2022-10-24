const sdk = require('api')('https://api.example.com/issue-78.json');

sdk.get('/store/order/1234/tracking/5678')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
