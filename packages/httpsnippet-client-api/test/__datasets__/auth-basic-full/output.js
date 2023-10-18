import sdk from '@api/auth-basic-full';

sdk.auth('buster', 'pug');
sdk.getAPISpecification({perPage: '10', page: '1'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
