const sdk = require('api')('https://api.example.com/application-json.json');

sdk.post('/anything', {
  number: 1,
  string: 'f"oo',
  arr: [1, 2, 3],
  nested: {a: 'b'},
  arr_mix: [1, 'a', {arr_mix_nested: {}}],
  boolean: false
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
