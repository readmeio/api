import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/rmoas.types';

import definition from '@readme/oas-examples/3.0/json/security.json';

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'GET',
    postData: {
      mimeType: 'application/json',
    },
    queryString: [
      {
        name: 'apiKey',
        value: 'a5a220e',
      },
    ],
    url: 'https://httpbin.org/anything/apiKey',
  },
  definition: definition as OASDocument,
};

export default mock;
