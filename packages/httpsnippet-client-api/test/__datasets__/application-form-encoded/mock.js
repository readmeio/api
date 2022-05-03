module.exports = {
  req: {
    url: 'http://httpbin.org/anything',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    functionMatcher: (url, opts) => {
      return opts.body === 'foo=bar&hello=world';
    },
  },
  res: {
    status: 200,
  },
};
