import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/rmoas.types';

import definition from '@readme/oas-examples/3.0/json/readme.json';

const authKey = 'buster:';

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
    url: 'https://dash.readme.com/api/v1/api-specification',
  },
  definition: definition as OASDocument,
};

export default mock;
