const sdk = require('api')('https://api.example.com/auth-bearer.json');

sdk.auth('myBearerToken');
sdk.post('/anything/bearer')
  .then(res => console.log(res))
  .catch(err => console.error(err));
