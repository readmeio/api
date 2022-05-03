const { streamToString } = require('../../helpers/fetch-mock');

module.exports = {
  req: {
    scope: 'https://httpbin.org/anything',
    method: 'post',
    /* headers: { // `fetch-mock` doesn't support regex matching on headers
      'content-type': /multipart\/form-data; boundary=form-data-boundary-(.*)/,
    }, */
    functionMatcher: async (url, opts) => {
      const body = await streamToString(opts.body);

      return /--form-data-boundary-(.*)\r\nContent-Disposition: form-data; name="foo"; filename="hello.txt"\r\nContent-Type: text\/plain\r\n\r\nHello world!\n\r\n--form-data-boundary-(.*)--\r\n\r\n/.test(
        body
      );
    },
  },
  res: {
    status: 200,
  },
};
