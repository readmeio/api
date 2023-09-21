import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/rmoas.types';

import definition from '@readme/oas-examples/3.0/json/security.json';

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [{ name: 'api_key', value: 'buster' }],
    headers: [],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      mimeType: 'application/json',
    },
    queryString: [],
    url: 'https://httpbin.org/anything/apiKey',
  },
  definition: definition as OASDocument,
};

export default mock;
