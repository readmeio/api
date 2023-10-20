---
title: How does it work?
category: 5d4c940cae4e610060475769
---

Behind the scenes, `api` will:

1. Fetch the supplied OpenAPI definition, either from a publically accessible URL, an absolute/relative path, or a [ReadMe API Registry ](https://docs.readme.com/reference/getapiregistry) UUID.
2. Dereference the definition so it's easier for us to handle.
3. Cache the definition so we don't need to re-fetch it.
4. Process the definition into chainable methods for HTTP verbs and operation IDs.

## Fetching

At its core, `api` is a syntactical sugar wrapper for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and the [HAR specification](http://www.softwareishard.com/blog/har-12-spec/). Parameters and payloads are compiled into a HAR according to the OpenAPI definition in question, using [@readme/oas-to-har](https://npm.im/@readme/oas-to-har) and then executed with [fetch-har](https://npm.im/fetch-har).

## Caching

### `.api/` directory

The `.api/` directory is where the CLI installation process stores all of its information: installation records, OpenAPI definitions, and code generated libraries. Its structure is as such:

```
.api/
├── api.json               // The `package-lock.json` equivalent that records metadata about the
|                          // installed SDKs.
└── apis/
    ├── hoot/
    ├── readme/
    │   ├── dist/          // The compiled source for your SDK. For JS, we offer a single SDK that's
    |   |                  // compatible with both ESM and CJS.
    │   ├── src/           // The raw source for your SDK.
    │   |   |── schemas/   // If your SDK has documented parameters or responses this is a directory
    |   |   |              // containing those as represented in JSON Schema. These schemas power
    |   |   |              // your SDK and the `types.ts` file.
    │   |   |── index.ts
    │   |   |── schemas.ts
    │   |   └── types.ts
    │   |── openapi.json
    │   |── package.json
    │   |── README.md
    │   └── tsconfig.json
    └── petstore/
```

#### `api.json`

The `api.json` file within `.api/` is where the CLI keeps track of everything that's been installed. It's structure has been closely modeled after NPM's `package-lock.json` file. For example, after running `npx api install @developers/v2.0#nysezql0wwo236`:

```json
{
  "$schema": "https://unpkg.com/api@7/schema.json",
  "apis": [
    {
      "private": true,
      "identifier": "petstore",
      "source": "@petstore/v1.0#tl1e4kl1cl8eg8",
      "integrity": "sha512-lQeYVerukls0IYy3Ys9J6Hri9nucH2zBZk6ehO1EI9a/0K3p/egoIw/Yz9A93KtB1KUUArjGK6ebqsZkHFxguA==",
      "installerVersion": "7.0.0",
      "language": "js",
      "createdAt": "2023-10-19T23:13:04.939Z"
    }
  ]
}
```

In the future, commands will be added to the CLI that will take advantage of this information, but for now it's only used to determine if you've already installed an API to the same `identifier` (say, to prevent you from installing `@developers/v2.0#nysezql0wwo236` twice).
