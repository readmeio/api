const sdk = require('api')('https://api.example.com/auth-basic-password-only.json');

sdk.auth('', 'pug');
sdk.getAPISpecification({perPage: '10', page: '1'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
