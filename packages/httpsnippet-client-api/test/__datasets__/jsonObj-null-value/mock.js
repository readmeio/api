module.exports = {
  req: {
    scope: 'https://httpbin.org/anything',
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    functionMatcher: (url, opts) => {
      return opts.body === JSON.stringify({ foo: null });
    },
  },
  res: {
    status: 200,
  },
};
