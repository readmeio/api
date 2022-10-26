const sdk = require('api')('https://api.example.com/auth-apikey-cookie.json');

sdk.auth('buster');
sdk.postAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
