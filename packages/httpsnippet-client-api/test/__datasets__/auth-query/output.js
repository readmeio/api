const sdk = require('api')('https://api.example.com/auth-query.json');

sdk.auth('a5a220e');
sdk.getAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
