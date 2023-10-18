import sdk from '@api/auth-apikey-header';

sdk.auth('a5a220e');
sdk.putAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
