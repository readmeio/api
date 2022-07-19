import type { OASDocument } from 'oas/@types/rmoas.types';
import type { SnippetMock } from '../../index.test';
import definition from '@readme/oas-examples/3.0/json/petstore.json';

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headersSize: 0,
    headers: [
      {
        name: 'Accept',
        value: 'application/xml',
      },
      {
        name: 'Authorization',
        value: 'Bearer 123',
      },
    ],
    httpVersion: 'HTTP/1.1',
    method: 'GET',
    postData: {
      mimeType: 'application/octet-stream',
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
        accept: 'application/xml',
        authorization: 'Bearer 123',
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
