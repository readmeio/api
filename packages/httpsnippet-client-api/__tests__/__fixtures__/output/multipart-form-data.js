const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {foo: 'bar'}, {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
