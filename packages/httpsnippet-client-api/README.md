# httpsnippet-client-api

An [HTTPSnippet](https://npm.im/httpsnippet) client for generating snippets for the [api](https://npm.im/api) module.

[![npm](https://img.shields.io/npm/v/httpsnippet-client-api)](https://npm.im/api) [![Build](https://github.com/readmeio/api/workflows/CI/badge.svg)](https://github.com/readmeio/api)

[![](https://raw.githubusercontent.com/readmeio/.github/main/oss-header.png)](https://readme.com)

## Installation

```sh
npm install --save httpsnippet-client-api
```

## Usage

```js
import { HTTPSnippet, addClientPlugin } from 'httpsnippet';
import apiClientPlugin from 'httpsnippet-client-api';

addClientPlugin('node', apiClientPlugin);

const har = {
  "log": {
    "entries": [
      {
        "request": {
          "cookies": [],
          "httpVersion": "HTTP/1.1",
          "method": "PUT",
          "headers": [
            {
              "name": "X-API-KEY",
              "value": "a5a220e"
            }
          ],
          "url": "https://httpbin.org/apiKey"
        }
      }
    ]
  }
}

const snippet = new HTTPSnippet(har);
const code = await snippet.convert('node', 'api', {
  api: {
    definition: {
      /* an OpenAPI definition object */
    }
    registryURI: '@example/v2.0#17273l2glm9fq4l5'
  }
});

console.log(code);
```

Results in the following:

```js
import sdk from '@api/example';

sdk.auth('a5a220e');
sdk
  .put('/apiKey')
  .then(({ data }}) => console.log(data))
  .catch(err => console.error(err));
```

We also support supplying a shorter `identifier` option that will take over the imported package and the variable that is created.

```js
const code = await snippet.convert('node', 'api', {
  api: {
    definition: {
      /* an OpenAPI definition object */
    }
    identifier: 'example',
    registryURI: '@example/v2.0#17273l2glm9fq4l5'
  }
});
```

```js
import example from 'example';

example.auth('a5a220e');
example
  .put('/apiKey')
  .then(({ data }}) => console.log(data))
  .catch(err => console.error(err));
```
