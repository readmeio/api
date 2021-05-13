const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/store/order/1234/tracking/5678', {Accept: 'application/xml'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
