# httpsnippet-client-api

An HTTP Snippet client for generating snippets for the [api](https://npm.im/api) module.

[![npm](https://img.shields.io/npm/v/httpsnippet-client-api)](https://npm.im/api) [![Build](https://github.com/readmeio/api/workflows/CI/badge.svg)](https://github.com/readmeio/api)

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.io)


## Installation

```sh
npm install --save httpsnippet-client-api
```

> ⚠️ Please note that this package is currently only compatile with the [ReadMe fork of httpsnippet](https://github.com/readmeio/httpsnippet/). Once PR [#165](https://github.com/Kong/httpsnippet/pull/165) is accepted into `httpsnippet` to pull in the new plugin architecture we've proposed, this package will function with the mainline package.

## Usage

```js
const httpsnippet = require('httpsnippet');
const client = require('httpsnippet-client-api');

HTTPSnippet.addTargetClient('node', client);

const snippet = new HTTPSnippet(harObject);
console.log(
  snippet.convert('node', 'api', {
    apiDefinitionPath: 'https://example.com/openapi.json'
  })
);
```
