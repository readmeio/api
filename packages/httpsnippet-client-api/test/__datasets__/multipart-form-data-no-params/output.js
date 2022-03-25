const sdk = require('api')('https://api.example.com/multipart-form-data-no-params.json');

sdk.post('/anything')
  .then(res => console.log(res))
  .catch(err => console.error(err));
