import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/dist/rmoas.types';

import definition from './openapi.json';

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
  fetch: {
    req: {
      url: 'https://httpbin.org/anything',
      method: 'post',
      query: {
        key: 'value',
        foo: ['bar', 'baz'],
        baz: 'abc',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        cookie: 'bar-cookie=baz; foo-cookie=bar',
      },
      functionMatcher: (url, opts) => {
        return opts.body === 'foo=bar&foo2=bar2&foo3=bar3&foo4=bar4';
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
