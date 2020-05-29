const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', 'Hello World')
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
