import sdk from '@api/auth-basic-username-only';

sdk.auth('buster');
sdk.getAPISpecification({perPage: '10', page: '1'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
