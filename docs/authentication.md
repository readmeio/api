---
title: Authentication
category: 62cc6ce22b8b6601da6cb12d
---

`api` supports API authentication through an `.auth()` method:

```js
const petstore = require('@api/petstore');

petstore.auth('myApiToken');
petstore.listPets().then(({ data }) => {
  // authenticated response
});
```

With the exception of OpenID and MutualTLS it supports all forms of authentication supported by the OpenAPI specification! Supply `.auth()` with your auth credentials and it'll magically figure out how to use it according to the API you're using. 🧙‍♀️

For example:

- HTTP Basic auth: `sdk.auth('username', 'password')`
- Bearer tokens (HTTP or OAuth 2): `sdk.auth('myBearerToken')`
- API Keys: `sdk.auth('myApiKey')`

> 📘
>
> The `.auth()` method is not chainable.
