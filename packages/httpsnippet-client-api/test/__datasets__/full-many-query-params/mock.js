module.exports = {
  req: {
    url: 'https://httpbin.org/anything',
    method: 'post',
    query: {
      key: 'value',
      foo: ['bar', 'baz'],
      baz: 'abc',
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      cookie: 'bar-cookie=baz; foo-cookie=bar',
    },
    functionMatcher: (url, opts) => {
      return opts.body === 'foo=bar&foo2=bar2&foo3=bar3&foo4=bar4&accept=application%2Fjson';
    },
  },
  res: {
    status: 200,
  },
};
