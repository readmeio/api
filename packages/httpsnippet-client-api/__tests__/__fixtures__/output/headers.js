const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/har', {'x-foo': 'Bar'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
