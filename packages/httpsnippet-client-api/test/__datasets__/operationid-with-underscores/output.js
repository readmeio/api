import operationidWithUnderscores from '@api/operationid-with-underscores';

operationidWithUnderscores.anything_Operation()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
