const sdk = require('api')('https://api.example.com/multipart-form-data-no-params.json');

sdk.post('/anything')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
