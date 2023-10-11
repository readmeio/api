import type { SnippetMock } from '../../index.test.js';
import type { OASDocument } from 'oas/rmoas.types';

import definition from './openapi.json';

/**
 * This test case is testing that when we have HAR `postData` of a file and the `value` is present
 * within the HAR we should still prioritize the `fileName` within the code snippet.
 *
 * @example
 * "postData": {
 *    "mimeType": "multipart/form-data",
 *    "params": [
 *      {
 *        "name": "foo",
 *        "value": "Hello World",
 *        "fileName": "test/__fixtures__/files/hello.txt",
 *        "contentType": "text/plain"
 *      }
 *    ]
 * }
 */
const mock: SnippetMock = {
  har: {
    bodySize: 0,
    cookies: [],
    headers: [
      {
        name: 'content-type',
        value: 'multipart/form-data',
      },
    ],
    headersSize: 0,
    httpVersion: 'HTTP/1.1',
    method: 'POST',
    postData: {
      mimeType: 'multipart/form-data',
      params: [
        {
          name: 'foo',
          value: 'Hello World',
          fileName: 'test/__fixtures__/files/hello.txt',
          contentType: 'text/plain',
        },
      ],
    },
    queryString: [],
    url: 'https://httpbin.org/anything',
  },
  definition: definition as OASDocument,
};

export default mock;
