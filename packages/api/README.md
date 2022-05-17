# 🚀 api

[![npm](https://img.shields.io/npm/v/api)](https://npm.im/api) [![Build](https://github.com/readmeio/api/workflows/CI/badge.svg)](https://github.com/readmeio/api)

Automatic SDK generation from an OpenAPI definition.

* [Installation](#installation)
* [Usage](#usage)
    * [Authentication](#authentication)
    * [Parameters and Payloads](#parameters-and-payloads)
    * [HTTP requests](#http-requests)
    * [Server configurations](#server-configurations)
* [How does it work?](#how-does-it-work)
* [Interested in contributing?](#interested-in-contributing)
* [FAQ](#faq)

## Installation
```
npm install api --save
```

## Usage
Using `api` is as simple as supplying it an OpenAPI and using the SDK as you would any other!

```js
const sdk = require('api')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json');

sdk.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```

The OpenAPI definition is automatically downloaded, cached, and transformed into a chainable [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) Promise that you can use to make API requests.

### Authentication
`api` supports API authentication through an `.auth()` method:

```js
sdk.auth('myApiToken');
sdk.listPets().then(...);
```

With the exception of OpenID, it supports all forms of authentication supported by the OpenAPI specification! Just give `.auth()` your credentials and it'll figure out how to use it according to the API you're using.

For example:

* HTTP Basic auth: `sdk.auth('username', 'password')`
* Bearer tokens (HTTP or OAuth 2): `sdk.auth('myBearerToken')`
* API Keys: `sdk.auth('myApiKey')`

> ℹ️ Note that `sdk.auth()` is not chainable.

### Parameters and Payloads
When supplying parameters and/or request body payloads to an API request, you don't need to explicitly define what goes where since the API definition contains all that information. All you need to do is supply either one or two objects:

* `body`: This will contain all data required for a request body payload for a POST, PUT, etc. request. It can either be an array or an object — whichever you need to use the API operation you're using.
* `metadata`: This is an object where all parameters (path, query, header, cookie) go. Again, don't worry about telling the SDK that a path parameter is for the path, that's all handled for you.

For example, if you wanted to make a simple GET request:

```js
sdk.showPetById({ petId: 1234 }).then(...)
```

Since `petId` matches up with the `petId` path parameter, the SDK here will issue a GET request against `/pets/1234`.

What about a POST request?

```js
sdk.createPets({ name: 'Buster' }).then(...)
```

Since `name` here would correspond on `createPets` to request body payload, this will issue a POST request against `/pets` to make a new pet named "Buster".

What about operations that require both? Well you can mix them too!

```js
sdk.updatePet({ name: 'Buster 2' }, { petId: 1234 }).then(...)
```

Since we've supplied two objects here, the SDK automatically knows that you're supplying both a `body` and `metadata`, and can make a PUT request against `/pets/1234` for you.

What about a `multipart/form-data` request? That works too, and you don't even have to worry about the fun of multipart boundaries!

```js
sdk.uploadFile({ file: '/path/to/a/file.txt' }).then(...)
```

You can also give it a stream and it'll handle all of the hard work for you.

```js
sdk.uploadFile({ file: fs.createReadStream('/path/to/a/file.txt') }).then(...)
```

### HTTP requests
If the API you're using doesn't have any documented operation IDs, you can make requests with HTTP verbs instead:

```js
sdk.get('/pets/{petId}', { petId: 1234 }).then(...)
```

The SDK supports GET, PUT, POST, DELETE, OPTIONS, HEAD, and TRACE requests.

### Server configurations
If the API you're using offers alternate server URLs and server variables in its [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject) definition you can supply this to the SDK with `.server()`:

```js
sdk.server('https://{region}.api.example.com/{basePath}', {
  name: 'eu',
  basePath: 'v14',
});

sdk.get('/pets').then(...)
```

When your request is executed it will be made to `https://eu.api.example.com/v14/pets`. Alternatively if you don't want to deal with URL templates you can opt to pass the full URL in instead:

```js
sdk.server('https://eu.api.example.com/v14');
```

## How does it work?
Behind the scenes, `api` will:

1. Download the supplied OpenAPI definition, either from a publically accessible URLs or an absolute/relative path.
2. Dereference the definition so it's easier for us to handle.
3. Hash the definition and cache it into a directory in `node_modules/.cache/api/`.
4. Process the definition and instantiate chainable methods for HTTP verbs and operation IDs the API contains via a JS [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

On subsequent requests, `api` will look in its cache, and if the supplied definition exists there, it'll retrieve it from the cache instead of re-retrieving it again.

## Interested in contributing?
Welcome! Have a look at [CONTRIBUTING.md](CONTRIBUTING.md).

## FAQ
#### Does this support YAML definitions?
Yes! YAML definitions will be automatically converted to JSON before they're cached and loaded as an SDK.

#### Does this support Swagger 2.0 definitions?
At the moment it does not. If you wish to use an API that has a Swagger 2.0 file, you'll need to first convert it to an OpenAPI 3 definition.

#### Does this support traditional OAuth 2 flows of creating tokens?
Not yet, unfortunately. For APIs that use OAuth 2, you'll need a fully-qualified token already for `api` to make requests.

#### Does this support APIs that use multiple forms of authentication on a single request?
Not yet! This is something we're thinking about how to handle, but it's difficult with the simple nature of the `.auth()` method as it currently does not require the user to inform the SDK of what kind of authentication scheme the token they're supplying it should match up against.

#### Will this work in browsers?
Not at the moment as the library requires some filesystem handling in order to manage its cache state, but it's something we're actively thinking about. If you'd like to help us out in making this compatible with browsers we'd love to help you out on a pull request.

#### Will this validate my data before it reaches the API?
Not yet! This is something we've got planned down the road.

#### Does this support OpenAPI definitions that require authentication to download?
Not yet! The URL that you give the module must be publicy accessible. If it isn't, you can download it to your computer/server and then use the absolute path to that file instead.

```js
const sdk = require('api')('/path/to/downloaded.json');
```

#### How do I access the Response object (for status and headers)?
By default we parse the response based on the `content-type` header for you. You can disable this by doing the following:

```js
sdk.config({ parseResponse: false });
```

#### Where is the cache stored?

By default the cache is configured with the [find-cache-dir](https://npm.im/find-cache-dir) library so the cache will be in `node_modules/.cache/api`. If placing this cache within the `node_modules/` directory is a problem for your environment (maybe you use `npm prune`) you can configure this by supplying an additional argument to the SDK instantiator:

```js
const sdk = require('api')('https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore.json', {
  cacheDir: './path/to/my/custom/cache/dir',
});

sdk.listPets().then(res => {
  console.log(`My pets name is ${res[0].name}!`);
});
```
