import query from '@api/query';

query.getAnything({foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
