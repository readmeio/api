---
title: Usage
excerpt: TKTK
category: 5d4c940cae4e610060475769
---

`api` can be used in two ways: a locally-installed code generated library or dynamically.

## Code generation

The code generation installation process that `api` offers comes in the form of an `api` CLI that will:

* Download and cache your OpenAPI definition into a `.api/` directory.
* Generate a full `api` library appropriate for the language you want.
  * ℹ️ Only TypeScript and JavaScript (with CommonJS or ECMAScript)are available right now.
* Install necessary packages required for the generated library to run.
* Install a `@api/your-api` package in your local `package.json`
  * This allows you to use the library with `require('@api/your-api')` or `import '@api/your-api'`.

![cli installer demo](https://user-images.githubusercontent.com/33762/178076675-76f3fc7e-8505-4847-b34d-08cc68e639bd.gif)

Once you have your library generated and installed you can use your SDK like you would any other:

```js
const sdk = require('@api/petstore');

sdk.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```

### `.api` directory

The `.api/` directory is where the CLI stores all of its information: installation records, OpenAPI files, and generated code. Its structure is as such:

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

## Dynamic

All you need to use `api` is to supply it an OpenAPI definition and then use the SDK as you would any other!

```js
const sdk = require('api')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json');

sdk.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```

The OpenAPI definition is automatically downloaded, cached, and transformed into a chainable [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) Promise that you can use to make API requests.
