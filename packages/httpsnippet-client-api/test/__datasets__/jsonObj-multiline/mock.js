module.exports = {
  req: {
    url: 'https://httpbin.org/anything',
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    functionMatcher: (url, opts) => {
      return opts.body === JSON.stringify({ foo: 'bar' });
    },
  },
  res: {
    status: 200,
  },
};
