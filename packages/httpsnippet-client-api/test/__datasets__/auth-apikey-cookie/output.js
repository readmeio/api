import authApikeyCookie from '@api/auth-apikey-cookie';

authApikeyCookie.auth('buster');
authApikeyCookie.postAnythingApikey()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
