const sdk = require('api')('https://api.example.com/auth-basic-username-only.json');

sdk.auth('buster');
sdk.getAPISpecification({perPage: '10', page: '1'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
