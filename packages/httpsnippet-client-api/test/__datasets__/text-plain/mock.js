module.exports = {
  req: {
    scope: 'https://httpbin.org/anything',
    method: 'post',
    headers: {
      'content-type': 'text/plain',
    },
    functionMatcher: (url, opts) => {
      return opts.body === 'Hello World';
    },
  },
  res: {
    status: 200,
  },
};
