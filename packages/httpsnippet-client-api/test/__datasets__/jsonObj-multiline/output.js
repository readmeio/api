const sdk = require('api')('https://api.example.com/jsonObj-multiline.json');

sdk.post('/anything', {foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
