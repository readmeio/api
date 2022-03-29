const sdk = require('api')('https://api.example.com/auth-query.json');

sdk.auth('a5a220e');
sdk.get('/anything/apiKey')
  .then(res => console.log(res))
  .catch(err => console.error(err));
