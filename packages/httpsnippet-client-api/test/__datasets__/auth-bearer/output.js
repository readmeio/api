import authBearer from '@api/auth-bearer';

authBearer.auth('myBearerToken');
authBearer.postAnythingBearer()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
