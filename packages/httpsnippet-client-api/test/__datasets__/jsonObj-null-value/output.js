const sdk = require('api')('https://api.example.com/jsonObj-null-value.json');

sdk.postAnything({foo: null})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
