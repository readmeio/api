const sdk = require('api')('https://api.example.com/text-plain.json');

sdk.post('/anything', 'Hello World')
  .then(res => console.log(res))
  .catch(err => console.error(err));
