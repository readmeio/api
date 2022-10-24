import DatauriParser from 'datauri/parser';

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
    // https://stackoverflow.com/questions/10623798/how-do-i-read-the-contents-of-a-node-js-stream-into-a-string-variable
    function streamToString(stream) {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
        stream.on('error', err => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      });
    }

    const headers = objectifyHeaders(opts.headers);

    return {
      uri: new URL(url).pathname,
      requestBody: await streamToString(opts.body),
      headers,
      boundary: headers['content-type'].split('boundary=')[1],
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
