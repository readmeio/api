const sdk = require('api')('https://api.example.com/headers.json');

sdk.getAnything({'x-foo': 'Bar', 'x-bar': 'foo'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
