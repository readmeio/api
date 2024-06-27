import authQuery from '@api/auth-query';

authQuery.auth('a5a220e');
authQuery.getAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
