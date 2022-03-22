const sdk = require('api')('https://example.com/openapi.json');

sdk.auth('', 'pug');
sdk.getAPISpecification({perPage: '10', page: '1'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
