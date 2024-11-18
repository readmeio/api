import authApikeyHeader from '@api/auth-apikey-header';

authApikeyHeader.auth('a5a220e');
authApikeyHeader.putAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
