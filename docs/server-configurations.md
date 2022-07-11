---
title: Server Configurations
excerpt: TKTK
category: 62cc6ce22b8b6601da6cb12d
---

If the API you're using offers alternate server URLs and server variables in its [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) definition you can supply this to the SDK with `.server()`:

```js
sdk.server('https://{region}.api.example.com/{basePath}', {
  name: 'eu',
  basePath: 'v14',
});

sdk.get('/pets').then(...)
```

When your request is executed it will be made to `https://eu.api.example.com/v14/pets`. Alternatively if you don't want to deal with URL templates you can opt to pass a full URL in instead:

```js
sdk.server('https://eu.api.example.com/v14');
```
