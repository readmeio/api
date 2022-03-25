module.exports = {
  scope: 'https://httpbin.org',
  method: 'POST',
  path: '/anything',
  body: /--form-data-boundary-(.*)\r\nContent-Disposition: form-data; name="foo"\r\n\r\nbar\r\n--form-data-boundary-(.*)--\r\n\r\n/,
  status: 200,
  reqheaders: {
    'content-type': /multipart\/form-data; boundary=form-data-boundary-(.*)/,
  },
};
