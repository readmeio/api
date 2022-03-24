# Contributing

<img align="right" width="25%" style="margin-bottom: 2em" src="https://owlbert.io/images/owlberts-png/camp.png.png">

## Commit Conventions

For our general commit conventions please consult our organization contributing guidelines [here](https://github.com/readmeio/.github/blob/main/.github/CONTRIBUTING.md).

## Help

If you need help don't be afraid to open up an issue!

## Packages
### `httpsnippet-client-api` snippet

If you wish to add or change functionality to how `api` snippets are generated, your changes should go within the `httpsnippet-client-api` package in `packages/`. We have a nifty test suite set up there that'll run pre-made JS code snippets for the [api](https://npm.im/api) package within a virtual environment, with mocked out HTTP requests, to ensure that everything is well and good. It's pretty neat!

To add a new test into this suite you should do the following:

1. Create a new directory for your test in `packages/httpsnippet-client-api/test/__datasets__`. This directory should be a short and clear description of what you're testing.
    * If you need to give additional context to your test please do add a `README` in this directory!
2. In this new directory you'll need to create 4 files: `har.json`, `openapi.json`, `mock.json`, and `output.js`.

#### har.json

The way that `httpsnippet-client-api` works is that it takes a HAR object and constructs a snippet according to it, and what the matching operation in an OpenAPI definition, say the API request should function.

This file should contain a fully defined [HAR object](http://www.softwareishard.com/blog/har-12-spec/) for your API request.

If you need to use dynamic data (like base64 encoding an API key) then this file can be renamed to `har.js` and the HAR can be exported with `module.exports`.

#### openapi.json

Within `openapi.json` you'll want to spec out the OpenAPI definition that will be powering this request. This definition should be fully valid to the spec.

If you'd like to reference one of the definitions that we provide in the [@readme/oas-examples](https://npm.im/@readme/oas-examples) package then you can rename `openapi.json` to `openapi.js` and have a single line of the following and the test suite will pick it up!

```js
module.exports = require('@readme/oas-examples/path/to/spec');
````

Additionally if you need help verifying that your OpenAPI definition is valid you can run `npx rdme validate path/to/your/definition.json`.

#### mock.json

This file is what is going to tell our test suite what endpoints your API test will be accessing so we can mock out those requests for you. Behind the scenes we use the amazing [nock](https://npm.im/nock) library for this. Generating this data is a bit difficult, but you can use `nock` itself to guide you along.

Say you have the following snippet:

```js
const sdk = require('api')('https://raw.githubusercontent.com/readmeio/api/main/packages/httpsnippet-client-api/test/__datasets__/query/openapi.json');

sdk.get('/anything', {foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

Running this normally you'll receive a JSON object back from the https://httpbin.org server referenced in that OpenAPI definition:

```js
{
  args: { baz: 'abc', foo: [ 'bar', 'baz' ], key: 'value' },
  data: '',
  files: {},
  form: {},
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip,deflate',
    Host: 'httpbin.org',
    'User-Agent': 'api (node)/4.2.0',
    'X-Amzn-Trace-Id': 'REDACTED'
  },
  json: null,
  method: 'GET',
  origin: 'REDACTED',
  url: 'https://httpbin.org/anything?key=value&foo=bar&foo=baz&baz=abc'
}
```

To have `nock` interpret this request into data that we can use to mock out requests back with `nock` you can add modify your snippet as such:

```js
const nock = require('nock');

nock.recorder.rec({
  output_objects: true,
  enable_reqheaders_recording: true,
});

const sdk = require('api')('https://raw.githubusercontent.com/readmeio/api/main/packages/httpsnippet-client-api/test/__datasets__/query/openapi.json');

sdk.get('/anything', {foo: ['bar', 'baz'], baz: 'abc', key: 'value'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

When this is run `nock` will dump out a record of what happened:

```js
<<<<<<-- cut here -->>>>>>
{
  "scope": "https://httpbin.org:443",
  "method": "GET",
  "path": "/anything?key=value&foo=bar&foo=baz&baz=abc",
  "body": "",
  "status": 200,
  "response": {
    "args": {
      "baz": "abc",
      "foo": [
        "bar",
        "baz"
      ],
      "key": "value"
    },
    "data": "",
    "files": {},
    "form": {},
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip,deflate",
      "Host": "httpbin.org",
      "User-Agent": "api (node)/4.2.0",
      "X-Amzn-Trace-Id": "REDACTED"
    },
    "json": null,
    "method": "GET",
    "origin": "REDACTED",
    "url": "https://httpbin.org/anything?key=value&foo=bar&foo=baz&baz=abc"
  },
  "rawHeaders": [
    "Date",
    "Thu, 24 Mar 2022 02:14:36 GMT",
    "Content-Type",
    "application/json",
    "Content-Length",
    "510",
    "Connection",
    "close",
    "Server",
    "gunicorn/19.9.0",
    "Access-Control-Allow-Origin",
    "*",
    "Access-Control-Allow-Credentials",
    "true"
  ],
  "reqheaders": {
    "accept": [
      "*/*"
    ],
    "accept-encoding": [
      "gzip,deflate"
    ],
    "connection": [
      "close"
    ],
    "host": "httpbin.org"
  },
  "responseIsBinary": false
}
<<<<<<-- cut here -->>>>>>

{
  args: { baz: 'abc', foo: [ 'bar', 'baz' ], key: 'value' },
  data: '',
  files: {},
  form: {},
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip,deflate',
    Host: 'httpbin.org',
    'User-Agent': 'api (node)/4.2.0',
    'X-Amzn-Trace-Id': 'REDACTED'
  },
  json: null,
  method: 'GET',
  origin: 'REDACTED',
  url: 'https://httpbin.org/anything?key=value&foo=bar&foo=baz&baz=abc'
}
```

Now all you have to do is take the data within the `<<<<<<-- cut here -->>>>>>` block and slim it down to only what you need for your API mock (you can always skip `response`):

```json
{
  "scope": "https://httpbin.org:443",
  "method": "GET",
  "path": "/anything?key=value&foo=bar&foo=baz&baz=abc",
  "status": 200
}
```

Some things you should be aware of:

* You can leave `response` out of `mock.json` as our test suite automatically mocks out a `response` to use so we can assert that what we mocked as a response was what we got.
* If your API doesn't have a request body you can leave `body` off.
* If your API request doesn't use any unique headers (eg. `Authentication` or `Content-Type`), then you can generally leave `reqheaders` off.
* `status` should always be 200.
* If you're testing something like `multpart/form-data` requests and need to regex a boundary you can rename `mock.json` to `mock.js` and add your regex in. See the `multipart-*` test for examples of this.

#### output.js

Now that you've done all the hard work for setting up your unit test all that's left is to craft the snippet you're expecting we should generate for your use case. You have a couple options for this:

1. Write it manually.
2. Run the test suite without one so it fails, and then populate what we thought it should be from the data in `har.json` and `openapi.json` into `output.js`.

After that, and all your tests are passing, then you're good! Thanks for helping out!
