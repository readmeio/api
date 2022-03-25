const sdk = require('api')('https://api.example.com/application-form-encoded.json');

sdk.post('/anything', {foo: 'bar', hello: 'world'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
