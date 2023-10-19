import sdk from '@api/auth-bearer';

sdk.auth('myBearerToken');
sdk.postAnythingBearer()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
