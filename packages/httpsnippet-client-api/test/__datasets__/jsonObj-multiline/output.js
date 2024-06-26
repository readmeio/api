import jsonObjMultiline from '@api/jsonObj-multiline';

jsonObjMultiline.postAnything({foo: 'bar'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
