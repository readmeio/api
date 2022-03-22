import type { OASDocument } from './types';
import 'isomorphic-fetch';
import OpenAPIParser from '@readme/openapi-parser';
import yaml from 'js-yaml';
import crypto from 'crypto';
import findCacheDir from 'find-cache-dir';
import fs from 'fs';
import os from 'os';
import path from 'path';
import makeDir from 'make-dir';

import { PACKAGE_NAME } from './packageInfo';

type CacheStore = Record<string, { path: string; original: string | OASDocument; title?: string; version?: string }>;

export default class Cache {
  static dir: string;

  static cacheStore: string;

  static specsCache: string;

  uri: string | OASDocument;

  uriHash: string;

  cached: false | CacheStore;

  constructor(uri: string | OASDocument) {
    Cache.setCacheDir();
    Cache.cacheStore = path.join(Cache.dir, 'cache.json');
    Cache.specsCache = path.join(Cache.dir, 'specs');

    // Resolve OpenAPI definition shorthand accessors from within the ReadMe API Registry.
    //
    // Examples:
    //    - @petstore/v1.0#n6kvf10vakpemvplx
    //    - @petstore#n6kvf10vakpemvplx
    this.uri =
      typeof uri === 'string'
        ? uri.replace(/^@[a-zA-Z0-9-_]+\/?(.+)#([a-z0-9]+)$/, 'https://dash.readme.com/api/v1/api-registry/$2')
        : uri;

    this.uriHash = Cache.getCacheHash(this.uri);

    // This should default to false so we have awareness if we've looked at the cache yet.
    this.cached = false;
  }

  static getCacheHash(file: string | OASDocument) {
    let data: string;
    if (typeof file === 'object') {
      // Under certain unit testing circumstances, we might be supplying the class with a raw JSON
      // object so we'll need to convert it to a string in order to hand it off to the crypto
      // module.
      data = JSON.stringify(file);
    } else {
      data = file;
    }

    return crypto.createHash('md5').update(data).digest('hex');
  }

  static setCacheDir(dir?: string) {
    if (dir) {
      Cache.dir = dir;
      return;
    } else if (Cache.dir) {
      // If we already have a cache dir set and aren't explicitly it to something new then we
      // shouldn't overwrite what we've already got.
      return;
    }

    Cache.dir = findCacheDir({ name: PACKAGE_NAME });
    if (typeof Cache.dir === 'undefined') {
      // The `find-cache-dir` module returns `undefined` if the `node_modules/` directory isn't
      // writable, or there's no `package.json` in the root-most directory. If this happens, we can
      // instead adhoc create a cache directory in the users OS temp directory and store our data
      // there.
      //
      // @link https://github.com/avajs/find-cache-dir/issues/29
      Cache.dir = makeDir.sync(path.join(os.tmpdir(), PACKAGE_NAME));
    }
  }

  static async reset() {
    await fs.promises.rm(Cache.cacheStore);
    await fs.promises.rmdir(Cache.specsCache, { recursive: true });
  }

  isCached() {
    const cache = this.getCache();
    return cache && this.uriHash in cache;
  }

  getCache() {
    if (typeof this.cached === 'object') {
      return this.cached;
    }

    this.cached = {};

    if (fs.existsSync(Cache.cacheStore)) {
      this.cached = JSON.parse(fs.readFileSync(Cache.cacheStore, 'utf8')) as CacheStore;
    }

    return this.cached;
  }

  get() {
    // If the class was supplied a raw object, just go ahead and bypass the caching system and
    // return that.
    if (typeof this.uri === 'object') {
      return this.uri;
    }

    if (!this.isCached()) {
      throw new Error(`${this.uri} has not been cached yet and must do so before being retrieved.`);
    }

    const cache = this.getCache();
    return JSON.parse(fs.readFileSync(cache[this.uriHash].path, 'utf8'));
  }

  async load() {
    // If the class was supplied a raw object, just go ahead and bypass the caching system and
    // return that.
    if (typeof this.uri === 'object') {
      return this.uri;
    }

    try {
      const url = new URL(this.uri);
      this.uri = url.href;

      return this.saveUrl();
    } catch (err) {
      return this.saveFile();
    }
  }

  save(json: Record<string, unknown>) {
    if (json.swagger) {
      throw new Error('Sorry, this module only supports OpenAPI definitions.');
    }

    return Promise.resolve(json)
      .then((res: any) => {
        // The `validate` method handles dereferencing for us.
        return OpenAPIParser.validate(res, {
          dereference: {
            // If circular `$refs` are ignored they'll remain in the API definition as
            // `$ref: String`. This allows us to not only do easy circular reference detection but
            // also stringify and  save dereferenced API definitions back into the cache directory.
            circular: 'ignore',
          },
        }).catch(err => {
          if (/is not a valid openapi definition/i.test(err.message)) {
            throw new Error("Sorry, that doesn't look like a valid OpenAPI definition.");
          }

          throw err;
        });
      })
      .then(async spec => {
        if (!fs.existsSync(Cache.dir)) {
          fs.mkdirSync(Cache.dir, { recursive: true });
        }

        if (!fs.existsSync(Cache.specsCache)) {
          fs.mkdirSync(Cache.specsCache, { recursive: true });
        }

        const cache = this.getCache();
        if (!(this.uriHash in cache)) {
          const saved = JSON.stringify(spec, null, 2);
          const jsonHash = crypto.createHash('md5').update(saved).digest('hex');

          cache[this.uriHash] = {
            path: path.join(Cache.specsCache, `${jsonHash}.json`),
            original: this.uri,
            title: 'title' in spec.info ? spec.info.title : undefined,
            version: 'version' in spec.info ? spec.info.version : undefined,
          };

          fs.writeFileSync(cache[this.uriHash].path, saved);
          fs.writeFileSync(Cache.cacheStore, JSON.stringify(cache, null, 2));

          this.cached = cache;
        }

        return spec;
      });
  }

  saveUrl() {
    const url = this.uri as string;
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unable to retrieve URL (${url}). Reason: ${res.statusText}`);
        }

        if (res.headers.get('content-type') === 'application/yaml' || /\.(yaml|yml)/.test(url)) {
          return res.text().then(text => {
            return yaml.load(text);
          });
        }

        return res.json();
      })
      .then((json: Record<string, unknown>) => this.save(json));
  }

  saveFile() {
    // Support relative paths by resolving them against the cwd.
    this.uri = path.resolve(process.cwd(), this.uri as string);

    if (!fs.existsSync(this.uri)) {
      throw new Error(
        `Sorry, we were unable to load ${this.uri} OpenAPI definition. Please either supply a URL or a path on your filesystem.`
      );
    }

    const filePath = this.uri;

    return Promise.resolve(fs.readFileSync(filePath, 'utf8'))
      .then((res: string) => {
        if (/\.(yaml|yml)/.test(filePath)) {
          return yaml.load(res);
        }

        return JSON.parse(res);
      })
      .then(json => this.save(json));
  }
}
