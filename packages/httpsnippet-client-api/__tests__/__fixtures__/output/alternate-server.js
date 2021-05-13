const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('123');
sdk.server('http://dev.local/v2');
sdk.create({foo: 'bar', hello: 'world'}, {id: '1234'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
