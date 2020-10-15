const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/har', {'x-foo': 'Bar'})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
