const sdk = require('api')('https://api.example.com/multipart-form-data.json');

sdk.post('/anything', {foo: 'bar'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
