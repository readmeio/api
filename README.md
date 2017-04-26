# api
[![CircleCI](https://circleci.com/gh/readmeio/api-build.svg?style=shield&circle-token=98043ed3103dabae88fdfed5275742eff4d2df9c)](https://circleci.com/gh/readmeio/api-build)

cli and node module to create, manage and run services

[![](https://d3vv6lp55qjaqc.cloudfront.net/items/1M3C3j0I0s0j3T362344/Untitled-2.png)](https://readme.io)

## Usage (CLI)

With npm:
```
npm install api-build -g
```

With yarn:
```
yarn global add api-build
```

This gives you the `api` command line program

```sh
# Displays usage information
api 

# In a fresh directory
api init
```

## Usage (node module)

With npm:
```
npm install api-build --save
```

With yarn:
```
yarn add api-build
```

```js
const api = require('api-build');
```

### `api.create(name, function)`

- `name` is the name of the of the action
- `function` is the code to invoke when this action is run

`function` is invoked with `(data, api)`

- `data` is an object containing parameters passed to your actions
- `api` is an object containing `error` and `success` methods to call on completion

## Credits
[Dom Harrington](https://github.com/domharrington)

[Marc Cuva](https://github.com/mjcuva)
