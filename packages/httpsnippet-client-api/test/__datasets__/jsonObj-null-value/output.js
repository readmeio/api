const sdk = require('api')('https://api.example.com/jsonObj-null-value.json');

sdk.post('/anything', {foo: null})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
