# httpsnippet-client-api

An HTTPSnippet client for generating snippets for the [api](https://npm.im/api) module.

[![npm](https://img.shields.io/npm/v/httpsnippet-client-api)](https://npm.im/api) [![Build](https://github.com/readmeio/api/workflows/CI/badge.svg)](https://github.com/readmeio/api)

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.io)


## Installation

```sh
npm install --save httpsnippet-client-api
```

## Usage

```js
const httpsnippet = require('httpsnippet');
const client = require('httpsnippet-client-api');

HTTPSnippet.addTargetClient('node', client);

const snippet = new HTTPSnippet(harObject);
console.log(
  snippet.convert('node', 'api', {
    apiDefinitionUri: 'https://example.com/openapi.json'
    apiDefinition: {
      /* an OpenAPI definition object */
    }
  })
);
```

Results in the following:

```js
const sdk = require('api')('https://example.com/openapi.json');

sdk.get('/anything')
  .then(res => console.log(res))
  .catch(err => console.error(err));
```
