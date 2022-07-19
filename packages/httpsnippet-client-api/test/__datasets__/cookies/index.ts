import type { OASDocument } from 'oas/@types/rmoas.types';
import type { SnippetMock } from '../../index.test';
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
  fetch: {
    req: {
      url: 'https://httpbin.org/anything',
      method: 'post',
      headers: {
        cookie: 'foo=bar; bar=baz',
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
