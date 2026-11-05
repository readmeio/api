import type nock from 'nock';

import DatauriParser from 'datauri/parser';

export const response = { id: 123, name: 'Buster' };

function requestPath(request: Request) {
  const url = new URL(request.url);
  return `${url.pathname}${url.search}`;
}

function requestHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}

async function requestPayload(request: Request): Promise<nock.Body> {
  const raw = await request.text();
  const contentType = (request.headers.get('content-type') ?? '').toLowerCase();

  // Nock 13/14 JSON-parsed `application/json` bodies before invoking reply callbacks.
  if (raw && contentType.startsWith('application/json')) {
    try {
      return JSON.parse(raw) as nock.Body;
    } catch {
      return raw;
    }
  }

  return raw;
}

export const responses = {
  async all(request: Request): Promise<nock.ReplyFnResult> {
    return [
      200,
      {
        uri: requestPath(request),
        headers: requestHeaders(request),
        requestBody: await requestPayload(request),
      },
    ];
  },

  async datauri(request: Request): Promise<nock.ReplyFnResult> {
    const buffer = Buffer.from(await request.arrayBuffer());
    const parser = new DatauriParser();

    return [
      200,
      {
        uri: requestPath(request),
        requestBody: parser.format('.png', buffer).content,
        headers: requestHeaders(request),
      },
    ];
  },

  delay: (res: Record<string, unknown> | string, delay: number) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(res), delay);
    });
  },

  headers(request: Request): nock.ReplyFnResult {
    return [200, requestHeaders(request)];
  },

  async multipart(request: Request): Promise<nock.ReplyFnResult> {
    const body = await request.text();

    return [
      200,
      {
        uri: requestPath(request),
        requestBody: body,
        headers: requestHeaders(request),
        boundary: body.split('\r\n')[0],
      },
    ];
  },

  real: (payload: nock.Body) => {
    return () => [200, payload];
  },

  async requestBody(request: Request): Promise<nock.ReplyFnResult> {
    return [200, { uri: requestPath(request), requestBody: await requestPayload(request) }];
  },

  searchParams(request: Request): nock.ReplyFnResult {
    return [200, requestPath(request)];
  },

  url: (prop: keyof URL) => {
    return (request: Request) => {
      return [200, new URL(request.url)[prop]];
    };
  },
};
