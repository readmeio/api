import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/types';

import definition from './openapi.json' with { type: 'json' };

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [
      {
        name: 'foo',
        value: 'bar',
      },
      {
        name: 'bar',
        value: 'baz',
      },
    ],
    headers: [],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      mimeType: 'application/json',
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
