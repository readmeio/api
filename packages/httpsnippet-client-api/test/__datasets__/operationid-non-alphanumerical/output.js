import sdk from '@api/operationid-non-alphanumerical';

sdk.auth('123');
sdk.findPetsByStatus({status: 'available'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
