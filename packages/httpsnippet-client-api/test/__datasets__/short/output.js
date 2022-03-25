const sdk = require('api')('https://api.example.com/short.json');

sdk.get('/anything')
  .then(res => console.log(res))
  .catch(err => console.error(err));
