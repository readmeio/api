const authKey = 'buster:';

module.exports = {
  bodySize: 0,
  cookies: [],
  headers: [
    {
      name: 'Authorization',
      value: `Basic ${Buffer.from(authKey).toString('base64')}`,
    },
  ],
  headersSize: 0,
  httpVersion: 'HTTP/1.1',
  method: 'GET',
  queryString: [
    { name: 'perPage', value: '10' },
    { name: 'page', value: '1' },
  ],
  url: 'https://dash.readme.com/api/v1/api-specification',
};
