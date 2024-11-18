import authBasicFull from '@api/auth-basic-full';

authBasicFull.auth('buster', 'pug');
authBasicFull.getAPISpecification({perPage: '10', page: '1'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
