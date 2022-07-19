import type { OASDocument } from 'oas/@types/rmoas.types';
import type { SnippetMock } from '../../index.test';
import definition from './openapi.json';

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
    url: 'http://httpbin.org/anything',
  },
  definition: definition as OASDocument,
  fetch: {
    req: {
      url: 'http://httpbin.org/anything',
      method: 'get',
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
