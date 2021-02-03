const sdk = require('api')('https://example.com/openapi.json');

sdk.post('/har', {
  number: 1,
  string: 'f"oo',
  arr: [1, 2, 3],
  nested: {a: 'b'},
  arr_mix: [1, 'a', {arr_mix_nested: {}}],
  boolean: false
})
  .then(json => console.log(json))
  .catch(err => console.error(err));
