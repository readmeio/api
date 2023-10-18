import sdk from '@api/auth-query';

sdk.auth('a5a220e');
sdk.getAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
