# api

The easiest way ever to create an awesome API... no, really. It's as simple as:

```shell
$ npm install api -g
$ api init
[ Edit files]
$ api deploy
```

There's a bunch of stuff below, but seriously... just run those commands above, and see how simple it is!

## Usage (CLI)

With npm:
```
npm install api -g
```

With yarn:
```
yarn global add api
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
npm install api --save
```

With yarn:
```
yarn add api
```

```js
const api = require('api');
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
