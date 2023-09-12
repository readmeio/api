import DatauriParser from 'datauri/parser';
import formDataToString from 'formdata-to-string';

function objectifyHeaders(headers: []) {
  return Object.fromEntries(headers);
}

export const response = {
  id: 123,
  name: 'Buster',
};

export const responses = {
  all: (url, opts) => {
    return {
      uri: new URL(url).pathname,
      headers: Object.fromEntries(opts.headers as unknown as []),
      requestBody: opts.body,
    };
  },

  datauri: (url, opts) => {
    const buffer = Buffer.from(opts.body as string, 'hex');
    const parser = new DatauriParser();

    return {
      uri: new URL(url).pathname,
      requestBody: parser.format('.png', buffer).content,
      headers: Object.fromEntries(opts.headers as unknown as []),
    };
  },

  delay: (res, delay) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(res), delay);
    });
  },

  headers: (url, opts) => {
    // `opts.headers` returns a `HeadersList` object instead of `Headers` as the typing suggests so
    // we need to convert it to an array before converting it to an object.
    return Object.fromEntries(opts.headers as unknown as []);
  },

  multipart: async (url, opts) => {
    const headers = objectifyHeaders(opts.headers);
    const payload = await formDataToString(opts.body);

    return {
      uri: new URL(url).pathname,
      requestBody: payload,
      headers,
      boundary: payload.split('\r\n')[0],
    };
  },

  real: res => {
    return () => res;
  },

  requestBody: () => {
    return (url, opts) => {
      return {
        uri: new URL(url).pathname,
        requestBody: JSON.parse(opts.body as string),
      };
    };
  },

  searchParams: url => {
    const res = new URL(url);
    return `${res.pathname}${res.search}`;
  },

  url: (prop: keyof URL) => {
    return url => {
      return new URL(url)[prop];
    };
  },
};
