import type { OASDocument } from 'oas/@types/rmoas.types';
import type { SnippetMock } from '../../index.test';
import definition from '@readme/oas-examples/3.0/json/readme.json';

const authKey = 'buster:pug';

const mock: SnippetMock = {
  har: {
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
    postData: {
      mimeType: 'application/json',
    },
    queryString: [
      { name: 'perPage', value: '10' },
      { name: 'page', value: '1' },
    ],
    url: 'https://dash.readme.io/api/v1/api-specification',
  },
  definition: definition as OASDocument,
  fetch: {
    req: {
      url: 'https://dash.readme.io/api/v1/api-specification',
      method: 'get',
      query: {
        perPage: 10,
        page: 1,
      },
      headers: {
        authorization: 'Basic YnVzdGVyOnB1Zw==',
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
