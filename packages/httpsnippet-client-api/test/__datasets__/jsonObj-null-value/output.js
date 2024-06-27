import jsonObjNullValue from '@api/jsonObj-null-value';

jsonObjNullValue.postAnything({foo: null})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
