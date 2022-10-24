const sdk = require('api')('https://api.example.com/jsonObj-multiline.json');

sdk.postAnything({foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
