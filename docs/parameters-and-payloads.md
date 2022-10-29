---
title: Parameters and Payloads
category: 62cc6ce22b8b6601da6cb12d
---

When supplying parameters and/or request body payloads to an API request, you don't need to explicitly define what goes where since the API definition contains all that information. All you need to do is supply either one or two objects:

- `body`: This will contain all data required for a request body payload for a POST, PUT, etc. request. It can either be an array or an object — whichever you need to use the API operation you're using.
- `metadata`: This is an object where all parameters (path, query, header, cookie) go. Again, don't worry about telling the SDK that a path parameter is for the path, that's all handled for you.

For example, if you wanted to make a GET request:

```js
sdk.showPetById({ id: 1234 }).then(...)
```

Since `id` matches up with the `id` path parameter, the SDK here will issue a GET request against `/pets/1234`.

What about a POST request?

```js
sdk.createPets({ name: 'Buster' }).then(...)
```

Since `name` here would correspond on `createPets` to request body payload, this will issue a POST request against `/pets` to make a new pet named "Buster".

What about operations that require both? Well you can mix them too!

```js
sdk.updatePet({ name: 'Buster 2' }, { id: 1234 }).then(...)
```

Since we've supplied two objects here, the SDK automatically knows that you're supplying both a `body` and `metadata`, and can make a PUT request against `/pets/1234` for you.

> 📘
>
> For background, the algorithm to determine if you're supplying a `body` or `metadata` for the first parameter runs a difference check against the payloads for either. If what you're supplying matches +25% of what is documented in the operation's request body payload, then we'll treat it as a `body` payload.
>
> We do this difference check because we've found that request body payloads might not always be as fully fleshed out in OpenAPI definitions, whereas metadata parameters typically are.

### `multipart/form-data`

What about a `multipart/form-data` request? That works too, and you don't even have to worry about the fun of multipart boundaries!

```js
sdk.uploadFile({ file: '/path/to/a/file.txt' }).then(...)
```

You can also give it a stream and it'll handle all of the hard work for you.

```js
sdk.uploadFile({ file: fs.createReadStream('/path/to/a/file.txt') }).then(...)
```
