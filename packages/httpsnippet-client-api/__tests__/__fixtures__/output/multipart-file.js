const fs = require("fs");
const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {
  foo: {
    value: 'fs.createReadStream("test/fixtures/files/hello.txt")',
    options: {filename: 'test/fixtures/files/hello.txt', contentType: 'text/plain'}
  }
}, {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'})
  .then(res => res.json())
  .then(res => {
    console.log(res);
  });
