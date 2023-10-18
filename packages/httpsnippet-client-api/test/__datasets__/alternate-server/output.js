import sdk from '@api/alternate-server';

sdk.server('http://dev.local/v2');
sdk.postGlobal()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
