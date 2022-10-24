const sdk = require('api')('https://api.example.com/auth-apikey-header.json');

sdk.auth('a5a220e');
sdk.put('/anything/apiKey')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
