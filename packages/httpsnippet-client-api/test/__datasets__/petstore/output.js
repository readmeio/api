import petstore from '@api/petstore';

petstore.auth('123');
petstore.findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
