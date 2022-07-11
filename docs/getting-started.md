---
title: Getting Started
excerpt: TKTK
category: 5d4c940cae4e610060475769
---

<p align="center">
  <img width="350" src="./images/logo.svg" />
</p>

<p align="center">
  Automatic SDK generation from an OpenAPI definition.
</p>

<p align="center">
  <a href="https://npm.im/api"><img src="https://img.shields.io/npm/v/api.svg" alt="NPM Version"></a>
  <a href="https://github.com/readmeio/api"><img src="https://github.com/readmeio/api/workflows/CI/badge.svg" alt="Build status"></a>
  <a href="https://npm.im/api"><img src="https://img.shields.io/node/v/api.svg" alt="Node Version"></a>
</p>

`api` is a library that facilitates creating an SDK from an OpenAPI definition. You can use its codegen offering to create an opinionated SDK for TypeScript or JS (+ TypeScript types).

```sh
$ npx api install https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json
```

```js
const sdk = require('@api/petstore');

sdk.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```

Or you can use it dynamically (though you won't have fancy TypeScript types):

```js
const sdk = require('api')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json');

sdk.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```
