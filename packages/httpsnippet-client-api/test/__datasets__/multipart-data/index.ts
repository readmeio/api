import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/dist/rmoas.types';

import formDataToString from 'formdata-to-string';

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
  fetch: {
    req: {
      scope: 'https://httpbin.org/anything',
      method: 'post',
      // @ts-expect-error Types don't reflect it but `fetch-mock` supports async function matchers.
      functionMatcher: async (url, { body }: { body: FormData }) => {
        const content = await formDataToString(body);

        // A fun thing about `fetch-mock` and these undocumented async matchers is that it doesn't
        // look at what you're returning so we could return `false` here and it would think that
        // the request was matched. Very cool.
        if (
          !/------formdata-undici-(.*)\r\nContent-Disposition: form-data; name="foo"; filename="hello.txt"\r\nContent-Type: text\/plain\r\n\r\nHello world!\n\r\n------formdata-undici-(.*)--/.test(
            content,
          )
        ) {
          throw new Error('The FormData payload does not match what was expected.');
        }

        return true;
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
