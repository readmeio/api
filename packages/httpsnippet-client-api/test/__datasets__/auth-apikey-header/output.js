const sdk = require('api')('https://api.example.com/auth-apikey-header.json');

sdk.auth('a5a220e');
sdk.put('/apiKey')
  .then(res => console.log(res))
  .catch(err => console.error(err));
