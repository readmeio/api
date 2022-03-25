const sdk = require('api')('https://api.example.com/auth-basic-password-only.json');

sdk.auth('', 'pug');
sdk.getAPISpecification({perPage: '10', page: '1'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
