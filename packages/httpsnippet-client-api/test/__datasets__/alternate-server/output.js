const sdk = require('api')('https://api.example.com/alternate-server.json');

sdk.server('http://dev.local/v2');
sdk.postGlobal()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
