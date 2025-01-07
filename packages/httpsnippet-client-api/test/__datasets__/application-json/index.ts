import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/types';

import definition from './openapi.json' with { type: 'json' };

const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [
      {
        name: 'content-type',
        value: 'application/json',
      },
    ],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      mimeType: 'application/json',
      text: JSON.stringify({
        number: 1,
        string: 'f"oo',
        arr: [1, 2, 3],
        nested: { a: 'b' },
        arr_mix: [
          1,
          'a',

          // This isn't present in the resulting request payloadbecause it's an empty object and
          // `api` filters these out.
          { arr_mix_nested: {} },
        ],
        boolean: false,
      }),
    },
    queryString: [],
    url: 'http://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
