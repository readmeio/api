---
title: Authentication
category: 62cc6ce22b8b6601da6cb12d
---

`api` supports API authentication through an `.auth()` method:

```js
sdk.auth('myApiToken');
sdk.listPets().then(res => {
  // response
});
```

With the exception of OpenID, it supports all forms of authentication supported by the OpenAPI specification! Supply `.auth()` with your auth credentials and it'll magically figure out how to use it according to the API you're using. 🧙‍♀️

For example:

- HTTP Basic auth: `sdk.auth('username', 'password')`
- Bearer tokens (HTTP or OAuth 2): `sdk.auth('myBearerToken')`
- API Keys: `sdk.auth('myApiKey')`

> 📘 Note that `sdk.auth()` is not chainable.
