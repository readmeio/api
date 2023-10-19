import sdk from '@api/issue-76';

sdk.auth('a5a220e');
sdk.getPetFindbystatus({status: 'available'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
