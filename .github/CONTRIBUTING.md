# Contributing

<img align="right" width="25%" style="margin-bottom: 2em" src="https://owlbert.io/images/owlberts-png/camp.png.png">

## Commit Conventions

For our general commit conventions please consult our organization contributing guidelines [here](https://github.com/readmeio/.github/blob/main/.github/CONTRIBUTING.md#commit-conventions).

## Help

If you need help don't be afraid to open up an issue!

## Packages

### `httpsnippet-client-api`

If you wish to add or change functionality to how `api` snippets are generated, your changes should go within [the `httpsnippet-client-api` package in `packages/`](https://github.com/readmeio/api/tree/main/packages/httpsnippet-client-api). We have a nifty test suite set up there that'll run pre-made JS code snippets for the [`api`](https://npm.im/api) package within a virtual environment, with mocked out HTTP requests, to ensure that everything is well and good. It's pretty neat!

To add a new test into this suite you should do the following:

1. Create a new directory for your test in `packages/httpsnippet-client-api/test/__datasets__`. This directory should be a short and clear description of what you're testing.
   - If you need to give additional context to your test, please add a `README` in this directory!
2. In this new directory you'll need to create 4 files: `har.json`, `openapi.json`, `mock.json`, and `output.js`.

#### `har.json`

`httpsnippet-client-api` works by taking a HAR object and its matching operation in an OpenAPI definition and constructing a code snippet based upon them.

This file should contain a fully defined [HAR object](http://www.softwareishard.com/blog/har-12-spec/) for your API request.

If you need to use dynamic data (like base64 encoding an API key) then this file can be renamed to `har.js` and the HAR can be exported with `module.exports`.

#### `openapi.json`

Within `openapi.json` you'll want to spec out the OpenAPI definition that will be powering this request. This definition should be fully valid to the spec.

If you'd like to reference one of the definitions that we provide in the [`@readme/oas-examples`](https://npm.im/@readme/oas-examples) package then you can rename `openapi.json` to `openapi.js` and have a single line of the following and the test suite will pick it up!

```js
module.exports = require("@readme/oas-examples/path/to/spec");
```

Additionally if you need help verifying that your OpenAPI definition is valid you can run `npx rdme validate path/to/your/definition.json`.

#### `mock.json`

This file is what is going to tell our test suite what endpoints your API test will be accessing so we can mock out those requests for you. Behind the scenes we the [`fetch-mock`](https://npm.im/fetch-mock) library for this.
Say you have the following snippet:

```js
const sdk = require("api")(
  "https://raw.githubusercontent.com/readmeio/api/main/packages/httpsnippet-client-api/test/__datasets__/query/openapi.json"
);

sdk
  .get("/anything", { foo: ["bar", "baz"], baz: "abc", key: "value" })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
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

To have `fetch-mock` mock this request we can construct a `mock.json` file that contains the following:

```json
{
  "req": {
    "url": "https://httpbin.org/anything",
    "method": "GET",
    "query": {
      "key": "value",
      "foo": ["bar", "baz"],
      "baz": "abc"
    }
  },
  "res": {
    "status": 200
  }
}
```

If we need to mock a more specific request, like `multipart/form-data` we can create a `mock.js` file instead with something like this:

```js
const { streamToString } = require('../../helpers/fetch-mock');

module.exports = {
  req: {
    scope: 'https://httpbin.org/anything',
    method: 'post',
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
```

Consult the [fetch-mock](https://npm.im/fetch-mock) for docs on what can you can do in `req` and `res`.

#### `output.js`

Now that you've done all the hard work for setting up your unit test all that's left is to craft the snippet you're expecting we should generate for your use case. You have a couple options for this:

1. Write it manually.
2. Run the test suite without one so it fails, and then populate what we thought it should be from the data in `har.json` and `openapi.json` into `output.js`.

After that, and all your tests are passing, then you're good! Thanks for helping out!
