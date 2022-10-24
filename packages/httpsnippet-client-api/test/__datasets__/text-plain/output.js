const sdk = require('api')('https://api.example.com/text-plain.json');

sdk.post('/anything', 'Hello World')
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
