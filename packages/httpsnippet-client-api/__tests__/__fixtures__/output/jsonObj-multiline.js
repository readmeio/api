const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: 'bar'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
