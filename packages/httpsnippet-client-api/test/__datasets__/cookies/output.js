import cookies from '@api/cookies';

cookies.postAnything({bar: 'baz', foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
