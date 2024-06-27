import alternateServer from '@api/alternate-server';

alternateServer.server('http://dev.local/v2');
alternateServer.postGlobal()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
