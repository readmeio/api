const sdk = require('api')('https://api.example.com/jsonObj-null-value.json');

sdk.post('/anything', {foo: null})
  .then(res => console.log(res))
  .catch(err => console.error(err));
