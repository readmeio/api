import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/types';

import definition from './openapi.json';

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [
      {
        name: 'accept',
        value: 'application/json',
      },
      {
        name: 'x-foo',
        value: 'Bar',
      },
      {
        name: 'x-bar',
        value: 'foo',
      },
      {
        name: 'reqKey',
        value: 'baz',
      },
    ],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'GET',
    postData: {
      mimeType: 'application/json',
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
