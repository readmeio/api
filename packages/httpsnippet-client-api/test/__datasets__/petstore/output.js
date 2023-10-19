import sdk from '@api/petstore';

sdk.auth('123');
sdk.findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
