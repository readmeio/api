const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: null})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
