import type { SnippetMock } from '../../index.test';
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
        name: 'foo',
        value: 'bar',
      },
      {
        name: 'foo',
        value: 'baz',
      },
      {
        name: 'baz',
        value: 'abc',
      },
    ],
    url: 'https://httpbin.org/anything?key=value',
  },
  definition: definition as OASDocument,
};

export default mock;
