const sdk = require('api')('https://api.example.com/http-insecure.json');

sdk.get('/anything')
  .then(res => console.log(res))
  .catch(err => console.error(err));
