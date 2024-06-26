import multipartData from '@api/multipart-data';

multipartData.postAnything({foo: 'test/__fixtures__/files/hello.txt'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
