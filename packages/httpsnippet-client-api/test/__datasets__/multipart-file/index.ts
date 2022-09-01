import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/dist/rmoas.types';

import { streamToString } from '../../helpers/fetch-mock';

import definition from './openapi.json';

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
      url: 'https://httpbin.org/anything',
      method: 'post',
      /* headers: { // `fetch-mock` doesn't support regex matching on headers
        'content-type': /multipart\/form-data; boundary=form-data-boundary-(.*)/,
      }, */
      // @ts-expect-error Types don't reflect it but `fetch-mock` supports async function matchers.
      functionMatcher: async (url, opts) => {
        const body = await streamToString(opts.body);

        return /--form-data-boundary-(.*)\r\nContent-Disposition: form-data; name="foo"; filename="hello.txt"\r\nContent-Type: text\/plain\r\n\r\nHello world!\n\r\n--form-data-boundary-(.*)--\r\n\r\n/.test(
          body
        );
      },
    },
    res: {
      status: 200,
    },
  },
};

export default mock;
