import type { OASDocument } from 'oas/types';
import type { SnippetMock } from '../../utils.js';

import definition from './openapi.json' with { type: 'json' };

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
    queryString: [],
    url: 'https://httpbin.org/anything/1234/5678/installs_report/v5',
  },
  definition: definition as unknown as OASDocument,
};

export default mock;
