---
title: Upgrading from v4
category: 5d4c940cae4e610060475769
---

If you're upgrading from v4 of `api`, welcome 👋 a lot's changed! With the introduction of v5, `api` now offers a complete [code generation offering](https://api.readme.dev/docs/usage#code-generation), complete with:

- Full TypeScript types (generated off your OpenAPI definition) 📖
- Ability to export to TypeScript, CJS, and ESM compiled files 📦
- Ability to run your SDK within a browser 🌍

It's neat, and you should check it out. 🥺

If you'd like to continue using the [dynamic syntax](https://api.readme.dev/docs/usage#dynamically) you will need to update how you're handling promises that are returned from API requests, but it shouldn't be too bad.

Here's what your `api` implementation may have looked like before under v4:

```js
const petstore = require('api')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json');

petstore.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```

And here's what it should look like now:

```js
const petstore = require('api')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json');

petstore.listPets().then(({ data }) => {
  console.log(`My pets name is ${data[0].name}!`);
});
```

If you were using the `.config({ parseResponse: false })` option, that option has been removed in favor of this new resolved data shape where we return `data`, `status`, `headers`, and `res` to you. You can see documentation on those [here](https://api.readme.dev/docs/making-requests).

Additionally if you have any instances where you're using HTTP method accessors like `petstore.get('/pets')`, `api@5` longer supports these and you will need to instead to use the operation ID for the operation you're accessing instead (i.e. `petstore.getPets()`). Consult [Making Requests](https://api.readme.dev/docs/making-requests) for more details.

And if you have any trouble or need help we're more than happy to give you an assist. https://github.com/readmeio/api/issues
