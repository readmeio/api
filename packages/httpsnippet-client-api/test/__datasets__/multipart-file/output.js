const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/anything', {foo: 'test/fixtures/files/hello.txt'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
