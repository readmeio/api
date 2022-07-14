---
title: Installation
category: 5d4c940cae4e610060475769
---

To use the codegeneration feature that `api` offers, you can run:

```shell
$ npx api install <path to an OpenAPI definition>
```

The `api` installer will guide you through several prompts about what kind of project you'll be using the SDK with. This command supports the following URI formats for supplying an OpenAPI definition:

- ReadMe API Registry UUID
  - `@developers/v2.0#nysezql0wwo236`
    - Though this one is for our own API Reference you can see yours, or an API you wish to use, on their ReadMe API Reference documentation by viewing Node → `api` code snippets.
- URLs
- Local file paths

To use the dynamic version of `api`, install the package to your project dependencies:

```shell
$ npm install api --save
```
