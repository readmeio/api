import sdk from '@api/auth-apikey-cookie';

sdk.auth('buster');
sdk.postAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
