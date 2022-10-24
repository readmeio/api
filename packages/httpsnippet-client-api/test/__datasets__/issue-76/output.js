const sdk = require('api')('https://api.example.com/issue-76.json');

sdk.auth('a5a220e');
sdk.get('/pet/findByStatus', {status: 'available'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
