import type { OASDocument } from 'oas/dist/rmoas.types';

import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';

import findCacheDir from 'find-cache-dir';
import 'isomorphic-fetch';
import makeDir from 'make-dir';

import Fetcher from './fetcher';
import { PACKAGE_NAME } from './packageInfo';

type CacheStore = Record<
  string,
  {
    hash: string;
    path?: string; // Deprecated in v4.5.0 in favor of `hash`.
    original: string | OASDocument;
    title?: string;
    version?: string;
  }
>;

export default class Cache {
  static dir: string;

  static cacheStore: string;

  static specsCache: string;

  uri: string | OASDocument;

  uriHash: string;

  cached: false | CacheStore;

  fetcher: Fetcher;

  constructor(uri: string | OASDocument, cacheDir: string | false = false) {
    Cache.setCacheDir(cacheDir);
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

  static setCacheDir(dir?: string | false) {
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
    if (Cache.cacheStore) {
      await fs.promises.rm(Cache.cacheStore).catch(() => {
        // no-op
      });
    }

    if (Cache.specsCache) {
      await fs.promises.rm(Cache.specsCache, { recursive: true }).catch(() => {
        // no-op
      });
    }
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

    // Prior to v4.5.0 we were putting a fully resolved path to the API definition in the cache
    // store but if you had specified a custom caching directory and would generate the cache on
    // your system, that filepath would obviously not be the same in other environments. For this
    // reason the `path` was removed from the cache store in favor of storing the `hash` instead.
    //
    // If we still have `path` in the config cache for backwards compatibility we should use it.
    if ('path' in cache[this.uriHash]) {
      return JSON.parse(fs.readFileSync(cache[this.uriHash].path, 'utf8'));
    }

    return JSON.parse(fs.readFileSync(path.join(Cache.specsCache, `${cache[this.uriHash].hash}.json`), 'utf8'));
  }

  async load() {
    // If the class was supplied a raw object we should still validate and make sure that it's
    // dereferenced in order for everything to function, but we shouldn't worry about saving it
    // into the cache directory architecture.
    if (typeof this.uri === 'object') {
      return Fetcher.validate(this.uri);
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
      const fileHash = crypto.createHash('md5').update(saved).digest('hex');

      cache[this.uriHash] = {
        hash: fileHash,
        original: this.uri,
        title: 'title' in spec.info ? spec.info.title : undefined,
        version: 'version' in spec.info ? spec.info.version : undefined,
      };

      fs.writeFileSync(path.join(Cache.specsCache, `${fileHash}.json`), saved);
      fs.writeFileSync(Cache.cacheStore, JSON.stringify(cache, null, 2));

      this.cached = cache;
    }

    return spec;
  }
}
