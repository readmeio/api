import issue76 from '@api/issue-76';

issue76.auth('a5a220e');
issue76.getPetFindbystatus({status: 'available'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
