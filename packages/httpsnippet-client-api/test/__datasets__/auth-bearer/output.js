const sdk = require('api')('https://api.example.com/auth-bearer.json');

sdk.auth('myBearerToken');
sdk.post('/anything/bearer')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
