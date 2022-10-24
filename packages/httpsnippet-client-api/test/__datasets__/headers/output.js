const sdk = require('api')('https://api.example.com/headers.json');

sdk.get('/anything', {'x-foo': 'Bar', 'x-bar': 'foo'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
