import type { SnippetMock } from '../../index.test';
import definition from '@readme/oas-examples/3.0/json/server-variables.json';

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
  definition,
  fetch: {
    req: {
      url: 'http://dev.local/v2/global',
      method: 'POST',
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
