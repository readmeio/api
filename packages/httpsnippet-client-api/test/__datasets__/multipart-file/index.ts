import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/types';

import definition from './openapi.json' with { type: 'json' };

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [
      {
        name: 'content-type',
        value: 'multipart/form-data',
      },
    ],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      mimeType: 'multipart/form-data',
      params: [
        {
          name: 'foo',
          fileName: 'test/__fixtures__/files/hello.txt',
          contentType: 'text/plain',
        },
      ],
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
