---
title: How does it work?
excerpt: TKTK
category: 5d4c940cae4e610060475769
---

Behind the scenes `api` will:

1. Fetch the supplied OpenAPI definition, either from a publically accessible URL, an absolute/relative path, or a [ReadMe API Registry ](https://docs.readme.com/reference/getapiregistry) UUID.
2. Dereference the definition so it's easier for us to handle.
3. Cache the definition so we don't need to re-fetch it.
4. Process the definition into chainable methods for HTTP verbs and operation IDs.
    * If you're using the dynamic `api` offering this is done whenever you call `api` by way of a JavaScript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). If you're using the code generation offering this only done at compilation time.

## Fetching

At its core `api` is a syntactical sugar wrapper for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [HAR specification](http://www.softwareishard.com/blog/har-12-spec/). Parameters and payloads are compiled into a HAR according to the OpenAPI definition in question, using [@readme/oas-to-har](https://npm.im/@readme/oas-to-har) and then executed with [fetch-har](https://npm.im/fetch-har).

## Caching

Depending on the way you're using `api`, either dynamically or with code generation, there are two caching mechanisms in place:

* CLI code generation: `.api/`
* Dynamic usage: `node_modules/.cache/api`

### `.api/` directory

The `.api/` directory is wher the CLI installation process stores all of its information: installation records, OpenAPI definitions, and code generated libraries. Its structure is as such:

```
.api/
├── api.json             // The `package-lock.json` equivalent that records
|                        // everything that's installed, when it was installed,
|                        // what the original source was, and what version of
|                        // `api` was used.
└── apis/
    ├── readme/
    |   ├── node_modules/
    │   ├── index.js
    │   ├── index.d.ts   // All types for the SDK, ready to use in your an IDE.
    │   |── openapi.json
    │   └── package.json
    └── petstore/
        ├── node_modules/
        ├── index.ts
        ├── index.d.ts
        ├── openapi.json
        └── package.json
```

#### `api.json`

The `api.json` file within `.api/` is where the CLI keeps track of everything that's been installed. It's structure has been closely modeled after NPM's `package-lock.json` file. For example, after running `npx api install @developers/v2.0#nysezql0wwo236`:

```json
{
  "version": "1.0",
  "apis": [
    {
      "identifier": "developers",
      "source": "@developers/v2.0#nysezql0wwo236",
      "integrity": "sha512-lQeYVerukls0IYy3Ys9J6Hri9nucH2zBZk6ehO1EI9a/0K3p/egoIw/Yz9A93KtB1KUUArjGK6ebqsZkHFxguA==",
      "installerVersion": "5.0.0-beta.0"
    }
  ]
}
```

In the future commands will be added to the CLI that will take advantage of this information, but for now it's only used to determine if you've already installed an API to the same `identifier` (say, to prevent you from installing `@developers/v2.0#nysezql0wwo236` twice).

### `node_modules/.cache/api`

Because the dynamic version of `api` cannot have access to the `identifier` system that the CLI installation process does, the dynamic version of `api` has a slightly different caching mechanism and stores its data within `node_modules/.cache/api`:

```
.node_modules/
└── .cache/
    └── api/
        ├── cache.json           // Similar to `api.json` this is a record of
        |                        // everything installed.
        └── specs/
            └── cbb821db3609f8983ce1a372dadd122c.json
```

> ⚠️
>
> Note that because the dynamic version of `api` requires a filesystem and the Node `crypto` module, `api` cannot be used in the browser. If you need to use it in a browser we recommend you use the code generation avenue instead.

#### `cache.json`

The `cache.json` file in `node_modules/.cache/api` is where the dynamic version of API stores and pulls all of its data from. OpenAPI definitions are indexed within this file by their original acessor (`require('api')('http://example.com/some-accessor')`).

The `hash` within this is then an md5 of the full OpenAPI definition that we retrieved.

If for some reason this file gets lost, or the accessor you're supplying to `api` changes for whatever reason `api` will re-retrieve the OpenAPI definition at run-time.

```
{
  "d6b93e95fa1a7efdce6d1406dc599923": {
    "hash": "cbb821db3609f8983ce1a372dadd122c",
    "original": "https://dash.readme.io/api/v1/api-registry/nysezql0wwo236",
    "title": "API Endpoints",
    "version": "2.0.0"
  }
}
```

#### Custom cache directory

By default the cache is configured with the [find-cache-dir](https://npm.im/find-cache-dir) library so the cache will be in `node_modules/.cache/api`. If placing this cache within the `node_modules/` directory is a problem for your environment (maybe you use `npm prune`) you can customize this by supplying an additional argument to the `api` instantiator:

```js
const sdk = require('api')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json', {
  cacheDir: './path/to/my/custom/cache/dir',
});

sdk.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```
