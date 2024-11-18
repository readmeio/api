import authBasicPasswordOnly from '@api/auth-basic-password-only';

authBasicPasswordOnly.auth('', 'pug');
authBasicPasswordOnly.getAPISpecification({perPage: '10', page: '1'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
