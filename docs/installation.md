---
title: Installation
excerpt: TKTK
category: 5d4c940cae4e610060475769
---

```shell
$ npm install api --save
```

To use the codegeneration feature that `api` offers you can then run:

```shell
$ npx api install <path to an OpenAPI definition>
```

The `api` installer supports the following URI formats for supplying an OpenAPI definition:

* ReadMe API Registry UUID
  * `@developers/v2.0#nysezql0wwo236`
    * Though this one is for our own API Reference you can see yours, or an API you wish to use, on their ReadMe API Reference documentation by viewing Node → `api` code snippets.
* URLs
* Local file paths
