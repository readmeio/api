const sdk = require('api')('https://api.example.com/parameter-special-characters.json');

sdk.getAppIdNumInstalls_reportV5({'app-id': '1234', num: '5678'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
