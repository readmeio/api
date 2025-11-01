import type { OASDocument } from 'oas/types';
import type { SnippetMock } from '../../utils.js';

import definition from '@readme/oas-examples/3.0/json/server-variables.json' with { type: 'json' };

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      mimeType: 'application/json',
    },
    queryString: [],
    url: 'http://dev.local/v2/global',
  },
  definition: definition as OASDocument,
};

export default mock;
