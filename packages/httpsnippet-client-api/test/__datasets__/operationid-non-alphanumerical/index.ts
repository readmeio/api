import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/dist/rmoas.types';

import definition from './openapi.json';

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [
      {
        name: 'Authorization',
        value: 'Bearer 123',
      },
    ],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'GET',
    postData: {
      mimeType: 'application/json',
    },
    queryString: [
      {
        name: 'status',
        value: 'available',
      },
    ],
    url: 'http://petstore.swagger.io/v2/pet/findByStatus',
  },
  definition: definition as OASDocument,
  fetch: {
    req: {
      url: 'http://petstore.swagger.io/v2/pet/findByStatus',
      method: 'GET',
      query: {
        status: 'available',
      },
      headers: {
        authorization: 'Bearer 123',
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
