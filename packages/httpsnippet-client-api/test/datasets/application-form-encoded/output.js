const sdk = require('api')('https://api.example.com/application-form-encoded.json');

sdk.postAnything({foo: 'bar', hello: 'world'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
