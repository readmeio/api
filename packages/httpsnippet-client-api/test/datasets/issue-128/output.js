const sdk = require('api')('https://api.example.com/issue-128.json');

sdk.auth('authKey\'With\'Apostrophes');
sdk.getItem()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
