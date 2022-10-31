---
title: Making Requests
category: 62cc6ce22b8b6601da6cb12d
---

If the API you're using doesn't have any documented [operation IDs](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#user-content-operationid), `api` will generate some for you to use.

If you're using code generation, these will be immediately available to use in your generated library. However, due to the nature of the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) architecture in the dynamic version of the library, this isn't the case for dynamically generated libraries. For these cases, you can check out the documentation for the API you're using.

> ⚠️
>
> We recommend using code generation as it'll give you the additional benefit of TypeScript type assistance and autocompletion (even if you aren't using TypeScript in your codebase).

With an instance of your SDK, you make an HTTP request against an operation on the API like so:

```js
const petstore = require('@api/petstore');

petstore.listPets().then(({ data, status, headers, res }) => {
  console.log(`My pets name is ${data[0].name}!`);
});
```

Here, the data returned in the promise from `listPets` is an object containing the following data:

- `data`: The data that came back in the API request. Under the hood this is the result of `api` running `res.json()` or `res.text()` on the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
- `status`: This is the HTTP status code of the response.
- `headers`: The headers that came back in the response. This is an instance of the [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) object.
- `res`: This is the raw [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object we received from the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Error Handling

For every response that is returned with an HTTP status code between 400 and 599, `api` will throw a custom error: `FetchError`. Identical to how responses are returned from successful requests, instances of `FetchError` can be destructured to obtain the same data. For example:

```js
await petstore.deletePet({ id: petId }).catch(({ status, data }) => {
  // status = 404
  // data = 'Not Found'
});
```

Alternatively if you'd like to check for an error other than `FetchError` (i.e., an error with the SDK itself), you can do that too:

```js
await petstore.deletePet({ id: petId }).catch(err => {
  if (!(err instanceof FetchError)) {
    throw err;
  }

  // err.status = 404
  // err.data = 'Not Found'
});
```

## Request Timeouts

By default, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) generally has a default timeout of 30 seconds. If you wish to configure this, you can with the `.config()` method:

```js
petstore.config({ timeout: 100 });

await petstore
  .deletePet({ id: petId })
  .then(() => {
    // goodbye, friend
  })
  .catch(err => {
    // err.message = The operation was aborted.
  });
```

By supplying a timeout to `.config({ timeout })`, in milliseconds, `api` will automatically initialize an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to handle timing out your request if it takes longer than you wish. Please note, however, that if you set a custom timeout the error that is thrown will be an instance of `AbortError`, **not** `FetchError`.

> 📘
>
> The `.config()` method is not chainable.
