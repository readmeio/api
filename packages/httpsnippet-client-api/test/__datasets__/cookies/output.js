const sdk = require('api')('https://api.example.com/cookies.json');

sdk.post('/anything', {bar: 'baz', foo: 'bar'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
