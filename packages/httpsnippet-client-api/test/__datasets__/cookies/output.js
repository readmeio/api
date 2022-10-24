const sdk = require('api')('https://api.example.com/cookies.json');

sdk.post('/anything', {bar: 'baz', foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
