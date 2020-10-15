const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: 'bar'})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
