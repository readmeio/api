<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/readmeio/api/main/docs/images/logo.svg" />
</p>

<p align="center">
  Magical SDK generation from an OpenAPI definition 🪄
</p>

<p align="center">
  <a href="https://npm.im/api"><img src="https://img.shields.io/npm/v/api?style=for-the-badge" alt="NPM Version"></a>
  <a href="https://npm.im/api"><img src="https://img.shields.io/node/v/api?style=for-the-badge" alt="Node Version"></a>
  <a href="https://npm.im/api"><img src="https://img.shields.io/npm/l/api?style=for-the-badge" alt="MIT License"></a>
  <a href="https://github.com/readmeio/api"><img src="https://img.shields.io/github/actions/workflow/status/readmeio/api/ci.yml?branch=main&style=for-the-badge" alt="Build status"></a>
</p>

- [Installation](https://api.readme.dev/docs/installation)
- [Usage](https://api.readme.dev/docs/usage)
  - [Authentication](https://api.readme.dev/docs/authentication)
  - [Parameters and Payloads](https://api.readme.dev/docs/parameters-and-payloads)
  - [Making requests](https://api.readme.dev/docs/making-requests)
  - [Server configurations](https://api.readme.dev/docs/server-configurations)
- [How does it work?](https://api.readme.dev/docs/how-it-works)
- [FAQ](https://api.readme.dev/docs/faq)

`api` is a library that facilitates creating an SDK from an OpenAPI definition. You can use its codegen offering to create an opinionated SDK for TypeScript or JS (+ TypeScript types).

```sh
$ npx api install https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.json
```

```js
const petstore = require('@api/petstore');

petstore.listPets().then(({ data }) => {
  console.log(`My pets name is ${data[0].name}!`);
});
```

Or you can use it dynamically (though you won't have fancy TypeScript types to help you out!):

```js
const petstore = require('api')(
  'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.json',
);

petstore.listPets().then(({ data }) => {
  console.log(`My pets name is ${data[0].name}!`);
});
```

The ESM syntax is supported as well:

```js
import api from 'api';
const petstore = api('@petstore/v1.0#tl1e4kl1cl8eg8');

petstore.listPets().then(({ data }) => {
  console.log(`My pets name is ${data[0].name}!`);
});
```
