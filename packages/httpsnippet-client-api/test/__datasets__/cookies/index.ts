import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/rmoas.types';

import definition from './openapi.json';

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
