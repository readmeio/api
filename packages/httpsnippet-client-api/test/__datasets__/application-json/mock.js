module.exports = {
  req: {
    url: 'http://httpbin.org/anything',
    method: 'post',
    functionMatcher: (url, opts) => {
      return (
        opts.body ===
        JSON.stringify({
          number: 1,
          string: 'f"oo',
          arr: [1, 2, 3],
          nested: {
            a: 'b',
          },
          arr_mix: [1, 'a'],
          boolean: false,
        })
      );
    },
  },
  res: {
    status: 200,
  },
};
