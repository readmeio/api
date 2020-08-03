const sdk = require('api')('https://example.com/openapi.json');
sdk.auth('authKey\'With\'Apostrophes');

sdk.getItem({accept: 'application/xml'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
