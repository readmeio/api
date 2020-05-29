const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: 'bar', hello: 'world'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
