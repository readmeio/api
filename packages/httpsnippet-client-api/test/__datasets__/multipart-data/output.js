const sdk = require('api')('https://api.example.com/multipart-data.json');

sdk.post('/anything', {foo: 'test/__fixtures__/files/hello.txt'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
