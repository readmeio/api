const sdk = require('api')('https://api.example.com/multipart-data.json');

sdk.postAnything({foo: 'test/__fixtures__/files/hello.txt'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
