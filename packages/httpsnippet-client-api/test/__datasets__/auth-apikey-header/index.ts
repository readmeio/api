import type { OASDocument } from 'oas/types';
import type { SnippetMock } from '../../utils.js';

import definition from '@readme/oas-examples/3.0/json/security.json' with { type: 'json' };

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headersSize: 0,
    headers: [
      {
        name: 'X-API-KEY',
        value: 'a5a220e',
      },
    ],
    httpVersion: 'HTTP/1.1',
    method: 'PUT',
    postData: {
      mimeType: 'application/json',
    },
    queryString: [],
    url: 'https://httpbin.org/anything/apiKey',
  },
  definition: definition as OASDocument,
};

export default mock;
