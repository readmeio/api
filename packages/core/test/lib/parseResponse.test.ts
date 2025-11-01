import { beforeEach, describe, expect, it, vi } from 'vitest';

import parseResponse from '../../src/lib/parseResponse.js';

const responseBody = JSON.stringify({
  id: 9205436248879918000,
  category: { id: 0 },
  name: '1',
  photoUrls: ['1'],
  tags: [],
});

let response: Response;

describe('#parseResponse', () => {
  beforeEach(() => {
    response = new Response(responseBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'x-custom-header': 'buster',
      },
    });
  });

  it('should parse `application/json` response as json', async () => {
    const { data, status, headers, res } = await parseResponse(response);

    expect(data).toStrictEqual(JSON.parse(responseBody));
    expect(status).toBe(200);
    expect(headers).toHaveHeader('content-type', 'application/json');
    expect(headers).toHaveHeader('x-custom-header', 'buster');
    expect(res).toBeInstanceOf(Response);
  });

  it('should parse `application/vnd.api+json` as json', async () => {
    response.headers.set('Content-Type', 'application/vnd.api+json');
    const { data, status, headers, res } = await parseResponse(response);

    expect(data).toStrictEqual(JSON.parse(responseBody));
    expect(status).toBe(200);
    expect(headers).toHaveHeader('content-type', 'application/vnd.api+json');
    expect(headers).toHaveHeader('x-custom-header', 'buster');
    expect(res).toBeInstanceOf(Response);
  });

  it('should parse non-json response as text', async () => {
    const nonJsonResponseBody = '<xml-string />';
    const nonJsonResponse = new Response('<xml-string />', {
      status: 202,
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    const { data, status, headers, res } = await parseResponse(nonJsonResponse);

    expect(data).toBe(nonJsonResponseBody);
    expect(status).toBe(202);
    expect(headers).toHaveHeader('content-type', 'application/xml');
    expect(res).toBeInstanceOf(Response);
  });

  it('should not error if invalid json is returned', async () => {
    // `JSON.parse('plain text')` will throw an exception, but if that happens we should just treat
    // the content as plain text.
    const invalidJsonResponse = new Response('plain text', {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data, status, headers, res } = await parseResponse(invalidJsonResponse);

    expect(data).toBe('plain text');
    expect(status).toBe(404);
    expect(headers).toHaveHeader('content-type', 'application/json');
    expect(res).toBeInstanceOf(Response);
  });

  it('should default to JSON with wildcard content-type', async () => {
    const wildcardResponse = new Response(responseBody, {
      headers: {
        'Content-Type': '*/*',
      },
    });

    const { data, status, headers, res } = await parseResponse(wildcardResponse);

    expect(data).toStrictEqual(JSON.parse(responseBody));
    expect(status).toBe(200);
    expect(headers).toHaveHeader('content-type', '*/*');
    expect(res).toBeInstanceOf(Response);
  });

  it('should return with empty string if there is no response', async () => {
    const emptyResponse = new Response(null, {
      status: 204,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data, status, headers, res } = await parseResponse(emptyResponse);

    expect(data).toBe('');
    expect(status).toBe(204);
    expect(headers).toHaveHeader('content-type', 'application/json');
    expect(res).toBeInstanceOf(Response);
  });

  it('should not modify original response object', async () => {
    const responseMethodSpyText = vi.spyOn(response, 'text');
    const responseMethodSpyArrayBuffer = vi.spyOn(response, 'arrayBuffer');
    const responseMethodSpyJson = vi.spyOn(response, 'json');

    await parseResponse(response);

    expect(responseMethodSpyText).not.toHaveBeenCalled();
    expect(responseMethodSpyArrayBuffer).not.toHaveBeenCalled();
    expect(responseMethodSpyJson).not.toHaveBeenCalled();
  });
});
