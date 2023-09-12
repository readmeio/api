import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/dist/rmoas.types';

import definition from './openapi.json';

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [
      {
        name: 'content-type',
        value: 'application/json',
      },
    ],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      params: [],
      text: '{"foo":null}',
      mimeType: 'application/json',
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
