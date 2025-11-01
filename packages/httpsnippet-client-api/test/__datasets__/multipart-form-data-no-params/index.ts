import type { OASDocument } from 'oas/types';
import type { SnippetMock } from '../../utils.js';

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
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
