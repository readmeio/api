import type { OASDocument } from 'oas/dist/rmoas.types';

import fs from 'fs';
import path from 'path';

import OpenAPIParser from '@readme/openapi-parser';
import 'isomorphic-fetch';
import yaml from 'js-yaml';

export default class Fetcher {
  uri: string | OASDocument;

  /**
   * @example @petstore/v1.0#n6kvf10vakpemvplx
   * @example @petstore#n6kvf10vakpemvplx
   */
  static registryUUIDRegex = /^@(?<project>[a-zA-Z0-9-_]+)(\/?(?<version>.+))?#(?<uuid>[a-z0-9]+)$/;

  constructor(uri: string | OASDocument) {
    if (typeof uri === 'string') {
      if (Fetcher.isAPIRegistryUUID(uri)) {
        // Resolve OpenAPI definition shorthand accessors from within the ReadMe API Registry.
        this.uri = uri.replace(Fetcher.registryUUIDRegex, 'https://dash.readme.com/api/v1/api-registry/$4');
      } else if (Fetcher.isGitHubBlobURL(uri)) {
        /**
         * People may try to use a public repository URL to the source viewer on GitHub not knowing
         * that this page actually serves HTML. In this case we want to rewrite these to the "raw"
         * version of this page that'll allow us to access the API definition.
         *
         * @example https://github.com/readmeio/oas-examples/blob/main/3.1/json/petstore.json
         */
        this.uri = uri.replace(/\/\/github.com/, '//raw.githubusercontent.com').replace(/\/blob\//, '/');
      } else {
        this.uri = uri;
      }
    } else {
      this.uri = uri;
    }
  }

  static isAPIRegistryUUID(uri: string) {
    return Fetcher.registryUUIDRegex.test(uri);
  }

  static isGitHubBlobURL(uri: string) {
    return /\/\/github.com\/[-_a-zA-Z0-9]+\/[-_a-zA-Z0-9]+\/blob\/(.*).(yaml|json|yml)/.test(uri);
  }

  static getProjectPrefixFromRegistryUUID(uri: string) {
    const matches = uri.match(Fetcher.registryUUIDRegex);
    if (!matches) {
      return undefined;
    }

    return matches.groups.project;
  }

  async load() {
    if (typeof this.uri !== 'string') {
      throw new TypeError(
        "Something disastrous occurred and a non-string URI was supplied to the Fetcher library. This shouldn't have happened!",
      );
    }

    return Promise.resolve(this.uri)
      .then(uri => {
        let url;
        try {
          url = new URL(uri);
        } catch (err) {
          // If that try fails for whatever reason than the URI that we have isn't a real URL and
          // we can safely attempt to look for it on the filesystem.
          return Fetcher.getFile(uri);
        }

        return Fetcher.getURL(url.href);
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
        `Sorry, we were unable to load an API definition from ${file}. Please either supply a URL or a path on your filesystem.`,
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
