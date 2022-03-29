const sdk = require('api')('https://api.example.com/auth-apikey-cookie.json');

sdk.auth('buster');
sdk.post('/anything/apiKey')
  .then(res => console.log(res))
  .catch(err => console.error(err));
