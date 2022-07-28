import type { OASDocument } from 'oas/dist/rmoas.types';
import type { SnippetMock } from '../../index.test';
import definition from './openapi.json';

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    httpVersion: 'HTTP/1.1',
    headers: [
      {
        name: 'content-type',
        value: 'text/plain',
      },
    ],
    headersSize: 0,
    method: 'POST',
    postData: {
      mimeType: 'text/plain',
      text: 'Hello World',
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
  fetch: {
    req: {
      url: 'https://httpbin.org/anything',
      method: 'post',
      headers: {
        'content-type': 'text/plain',
      },
      functionMatcher: (url, opts) => {
        return opts.body === 'Hello World';
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
