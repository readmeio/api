const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/anything', {
  number: 1,
  string: 'f"oo',
  arr: [1, 2, 3],
  nested: {a: 'b'},
  arr_mix: [1, 'a', {arr_mix_nested: {}}],
  boolean: false
})
  .then(res => console.log(res))
  .catch(err => console.error(err));
