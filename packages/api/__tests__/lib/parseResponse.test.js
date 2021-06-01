// Nabbed these test cases from here:
// https://github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/__tests__/lib/parse-response.test.js#L182-L210
const { Response } = require('node-fetch');
const parseResponse = require('../../src/lib/parseResponse');

const responseBody = JSON.stringify({
  id: 9205436248879918000,
  category: { id: 0 },
  name: '1',
  photoUrls: ['1'],
  tags: [],
});

let response;

beforeEach(() => {
  response = new Response(responseBody, {
    headers: {
      'Content-Type': 'application/json',
      'x-custom-header': 'application/json',
    },
  });
});

describe('#parseResponse', () => {
  it('should parse application/json response as json', async () => {
    expect(await parseResponse(response)).toStrictEqual(JSON.parse(responseBody));
  });

  it('should parse application/vnd.api+json as json', async () => {
    response.headers['Content-Type'] = 'application/vnd.api+json';
    expect(await parseResponse(response)).toStrictEqual(JSON.parse(responseBody));
  });

  it('should parse non-json response as text', async () => {
    const nonJsonResponseBody = '<xml-string />';
    const nonJsonResponse = new Response('<xml-string />', {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    expect(await parseResponse(nonJsonResponse)).toStrictEqual(nonJsonResponseBody);
  });

  it('should not error if invalid json is returned', async () => {
    const invalidJsonResponse = new Response('plain text', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(await parseResponse(invalidJsonResponse)).toBe('plain text');
  });

  it('should default to JSON with wildcard content-type', async () => {
    const wildcardResponse = new Response(responseBody, {
      headers: {
        'Content-Type': '*/*',
      },
    });

    expect(await parseResponse(wildcardResponse)).toStrictEqual(JSON.parse(responseBody));
  });

  it('should return with empty string if there is no response', async () => {
    const emptyResponse = new Response(null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(await parseResponse(emptyResponse)).toStrictEqual('');
  });
});
