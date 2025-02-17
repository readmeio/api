import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/types';

import definition from './openapi.json' with { type: 'json' };

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    httpVersion: 'HTTP/1.1',
    headers: [
      {
        name: 'content-type',
        value: 'text/plain',
      },
    ],
    headersSize: 0,
    method: 'POST',
    postData: {
      mimeType: 'text/plain',
      text: 'Hello World',
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
