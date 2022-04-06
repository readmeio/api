import type { OASDocument } from 'oas/@types/rmoas.types';

import 'isomorphic-fetch';
import OpenAPIParser from '@readme/openapi-parser';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export default class Fetcher {
  uri: string | OASDocument;

  constructor(uri: string | OASDocument) {
    /**
     * Resolve OpenAPI definition shorthand accessors from within the ReadMe API Registry.
     *
     * @example @petstore/v1.0#n6kvf10vakpemvplx
     * @example @petstore#n6kvf10vakpemvplx
     */
    this.uri =
      typeof uri === 'string'
        ? uri.replace(/^@[a-zA-Z0-9-_]+\/?(.+)#([a-z0-9]+)$/, 'https://dash.readme.com/api/v1/api-registry/$2')
        : uri;
  }

  async load() {
    if (typeof this.uri !== 'string') {
      throw new TypeError(
        "Something disastrous happened and a non-string URI was supplied to the Fetcher library. This shouldn't have happened!"
      );
    }

    return Promise.resolve(this.uri)
      .then(uri => {
        try {
          const url = new URL(uri);

          return Fetcher.getURL(url.href);
        } catch (err) {
          return Fetcher.getFile(uri);
        }
      })
      .then(res => Fetcher.validate(res))
      .then(res => res as OASDocument);
  }

  static getURL(url: string) {
    // @todo maybe include our user-agent here to identify our request
    return fetch(url).then(res => {
      if (!res.ok) {
        throw new Error(`Unable to retrieve URL (${url}). Reason: ${res.statusText}`);
      }

      if (res.headers.get('content-type') === 'application/yaml' || /\.(yaml|yml)/.test(url)) {
        return res.text().then(text => {
          return yaml.load(text);
        });
      }

      return res.json();
    });
  }

  static getFile(uri: string) {
    // Support relative paths by resolving them against the cwd.
    const file = path.resolve(process.cwd(), uri);

    if (!fs.existsSync(file)) {
      throw new Error(
        `Sorry, we were unable to load an API definition from ${file}. Please either supply a URL or a path on your filesystem.`
      );
    }

    return Promise.resolve(fs.readFileSync(file, 'utf8')).then((res: string) => {
      if (/\.(yaml|yml)/.test(file)) {
        return yaml.load(res);
      }

      return JSON.parse(res);
    });
  }

  static validate(json: any) {
    if (json.swagger) {
      throw new Error('Sorry, this module only supports OpenAPI definitions.');
    }

    // The `validate` method handles dereferencing for us.
    return OpenAPIParser.validate(json, {
      dereference: {
        /**
         * If circular `$refs` are ignored they'll remain in the API definition as `$ref: String`.
         * This allows us to not only do easy circular reference detection but also stringify and
         * save dereferenced API definitions back into the cache directory.
         */
        circular: 'ignore',
      },
    }).catch(err => {
      if (/is not a valid openapi definition/i.test(err.message)) {
        throw new Error("Sorry, that doesn't look like a valid OpenAPI definition.");
      }

      throw err;
    });
  }
}
