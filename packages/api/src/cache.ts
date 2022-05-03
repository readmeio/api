import type { OASDocument } from 'oas/@types/rmoas.types';

import 'isomorphic-fetch';
import OpenAPIParser from '@readme/openapi-parser';
import crypto from 'crypto';
import findCacheDir from 'find-cache-dir';
import fs from 'fs';
import os from 'os';
import path from 'path';
import makeDir from 'make-dir';

import { PACKAGE_NAME } from './packageInfo';

import Fetcher from './fetcher';

type CacheStore = Record<string, { path: string; original: string | OASDocument; title?: string; version?: string }>;

export default class Cache {
  static dir: string;

  static cacheStore: string;

  static specsCache: string;

  uri: string | OASDocument;

  uriHash: string;

  cached: false | CacheStore;

  fetcher: Fetcher;

  constructor(uri: string | OASDocument) {
    Cache.setCacheDir();
    Cache.cacheStore = path.join(Cache.dir, 'cache.json');
    Cache.specsCache = path.join(Cache.dir, 'specs');

    this.fetcher = new Fetcher(uri);

    this.uri = this.fetcher.uri;
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
    await fs.promises.rm(Cache.specsCache, { recursive: true });
  }

  static validate(json: any) {
    if (json.swagger) {
      throw new Error('Sorry, this module only supports OpenAPI definitions.');
    }

    // The `validate` method handles dereferencing for us.
    return OpenAPIParser.validate(json, {
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

    return this.fetcher.load().then(async spec => this.save(spec));
  }

  save(spec: OASDocument) {
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
  }
}
