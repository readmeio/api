const sdk = require('api')('https://api.example.com/auth-bearer.json');

sdk.auth('myBearerToken');
sdk.postAnythingBearer()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
