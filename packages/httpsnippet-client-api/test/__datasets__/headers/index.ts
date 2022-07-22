import type { OASDocument } from 'oas/@types/rmoas.types';
import type { SnippetMock } from '../../index.test';
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
        name: 'X-Bar',
        value: 'foo',
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
  fetch: {
    req: {
      url: 'https://httpbin.org/anything',
      method: 'GET',
      headers: {
        'x-bar': 'foo',
        'x-foo': 'Bar',
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
