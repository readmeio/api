import type nock from 'nock';

import DatauriParser from 'datauri/parser';

export const response = { id: 123, name: 'Buster' };

export const responses = {
  all(this: nock.ReplyFnContext, uri: string, payload: nock.Body) {
    return [200, { uri, headers: this.req.headers, requestBody: payload }];
  },

  datauri(this: nock.ReplyFnContext, uri: string, payload: nock.Body) {
    const buffer = Buffer.from(payload as string, 'hex');
    const parser = new DatauriParser();

    return [
      200,
      {
        uri,
        requestBody: parser.format('.png', buffer).content,
        headers: this.req.headers,
      },
    ];
  },

  delay: (res: Record<string, unknown> | string, delay: number) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(res), delay);
    });
  },

  headers: function responseHeaders(this: nock.ReplyFnContext) {
    return [200, this.req.headers];
  },

  multipart: function responseMultipart(this: nock.ReplyFnContext, uri: string, body: nock.Body): nock.ReplyFnResult {
    return [200, { uri, requestBody: body, headers: this.req.headers, boundary: body.split('\r\n')[0] }];
  },

  real: (payload: nock.Body) => {
    return () => [200, payload];
  },

  requestBody: (url: string, payload: nock.Body) => {
    return [200, { uri: url, requestBody: payload }];
  },

  searchParams: (uri: string) => {
    const res = new URL(`https://example.com${uri}`);
    return [200, `${res.pathname}${res.search}`];
  },

  url: (prop: keyof URL) => {
    return (uri: string) => {
      return [200, new URL(`https://example.com${uri}`)[prop]];
    };
  },
};
