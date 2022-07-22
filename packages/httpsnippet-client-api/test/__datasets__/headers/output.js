const sdk = require('api')('https://api.example.com/headers.json');

sdk.get('/anything', {'x-foo': 'Bar', 'x-bar': 'foo'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
