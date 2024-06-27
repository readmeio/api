import operationidNonAlphanumerical from '@api/operationid-non-alphanumerical';

operationidNonAlphanumerical.auth('123');
operationidNonAlphanumerical.findPetsByStatus({status: 'available'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
