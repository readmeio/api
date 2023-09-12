import type { SnippetMock } from '../../index.test';
import type { OASDocument } from 'oas/dist/rmoas.types';

import formDataToString from 'formdata-to-string';

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
          value: 'bar',
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
      method: 'POST',
      // @ts-expect-error Types don't reflect it but `fetch-mock` supports async function matchers.
      functionMatcher: async (url, { body }: { body: FormData }) => {
        const content = await formDataToString(body);

        // A fun thing about `fetch-mock` and these undocumented async matchers is that it doesn't
        // look at what you're returning so we could return `false` here and it would think that
        // the request was matched. Very cool.
        if (
          !/------formdata-undici-(.*)\r\nContent-Disposition: form-data; name="foo"\r\n\r\nbar\r\n------formdata-undici-(.*)--/.test(
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
