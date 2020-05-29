const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {
  foo: {
    value: 'Hello World',
    options: {filename: 'hello.txt', contentType: 'text/plain'}
  }
}, {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
