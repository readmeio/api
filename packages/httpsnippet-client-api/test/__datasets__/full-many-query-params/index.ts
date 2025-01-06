import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/types';

import definition from './openapi.json' with { type: 'json' };

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [
      {
        name: 'foo-cookie',
        value: 'bar',
      },
      {
        name: 'bar-cookie',
        value: 'baz',
      },
    ],
    headers: [
      {
        name: 'accept',
        value: 'application/json',
      },
      {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded',
      },
    ],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      mimeType: 'application/x-www-form-urlencoded',
      params: [
        {
          name: 'foo',
          value: 'bar',
        },
        {
          name: 'foo2',
          value: 'bar2',
        },
        {
          name: 'foo3',
          value: 'bar3',
        },
        {
          name: 'foo4',
          value: 'bar4',
        },
      ],
    },
    queryString: [
      {
        name: 'foo',
        value: 'bar',
      },
      {
        name: 'foo',
        value: 'baz',
      },
      {
        name: 'baz',
        value: 'abc',
      },
    ],
    url: 'https://httpbin.org/anything?key=value',
  },
  definition: definition as OASDocument,
};

export default mock;
