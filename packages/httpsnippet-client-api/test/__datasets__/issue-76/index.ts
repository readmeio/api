import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/rmoas.types';

import definition from './openapi.json';

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
        name: 'status',
        value: 'available',
      },
      {
        name: 'api_key',
        value: 'a5a220e',
      },
    ],
    url: 'http://petstore.swagger.io/v2/pet/findByStatus',
  },
  definition: definition as OASDocument,
};

export default mock;
