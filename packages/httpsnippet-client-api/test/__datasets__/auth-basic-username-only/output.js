import authBasicUsernameOnly from '@api/auth-basic-username-only';

authBasicUsernameOnly.auth('buster');
authBasicUsernameOnly.getAPISpecification({perPage: '10', page: '1'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
