---
title: HTTP Requests
category: 62cc6ce22b8b6601da6cb12d
---

If the API you're using doesn't have any documented operation IDs, you can make requests with HTTP verbs instead:

```js
sdk.get('/pets/{petId}', { petId: 1234 }).then(...)
```

The SDK supports GET, PUT, POST, DELETE, OPTIONS, HEAD, and TRACE requests.
