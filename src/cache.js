const fetch = require('node-fetch');
const SwaggerParser = require('@apidevtools/swagger-parser');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const yaml = require('yaml');
const crypto = require('crypto');
const findCacheDir = require('find-cache-dir');
const pkg = require('../package.json');
const fs = require('fs');

const cacheDir = findCacheDir({ name: pkg.name, thunk: true });

class SdkCache {
  constructor(uri) {
    this.uri = uri;
    this.uriHash = SdkCache.getCacheHash(this.uri);
    this.dir = cacheDir();
    this.cacheStore = cacheDir('cache.json');
    this.specsCache = cacheDir('specs');

    // This should default to false so we have awareness if we've looked at the cache yet.
    this.cached = false;
  }

  static getCacheHash(file) {
    let data = file;
    if (typeof file === 'object') {
      // Under certain unit testing circumstances, we might be supplying the class with a raw JSON object so we'll need
      // to convert it to a string in order to hand it off to the crypto module.
      data = JSON.stringify(file);
    }

    return crypto.createHash('md5').update(data).digest('hex');
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

    if (fs.existsSync(this.cacheStore)) {
      this.cached = JSON.parse(fs.readFileSync(this.cacheStore, 'utf8'));
    }

    return this.cached;
  }

  get() {
    // If the class was supplied a raw object, just go ahead and bypass the caching system and return that.
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
    // If the class was supplied a raw object, just go ahead and bypass the caching system and return that.
    if (typeof this.uri === 'object') {
      return this.uri;
    }

    try {
      const url = new URL(this.uri);
      this.uri = url.href;

      return this.saveUrl();
    } catch (err) {
      if (!fs.existsSync(this.uri)) {
        throw new Error(
          `Sorry, we were unable to load that OpenAPI definition. Please either supply a URL or a path on your filesystem.`
        );
      }

      return this.saveFile();
    }
  }

  save(json) {
    const self = this;

    if (json.swagger) {
      throw new Error('Sorry, this module only supports OpenAPI definitions.');
    }

    return new Promise(resolve => {
      return resolve(json);
    })
      .then(res => {
        return SwaggerParser.validate(res).catch(err => {
          if (/is not a valid openapi api definition/i.test(err.message)) {
            throw new Error("Sorry, that doesn't look like a valid OpenAPI definition.");
          }

          throw err;
        });
      })
      .then(res => {
        return $RefParser.dereference(res);
      })
      .then(async spec => {
        if (!fs.existsSync(self.dir)) {
          fs.mkdirSync(self.dir, { recursive: true });
        }

        if (!fs.existsSync(self.specsCache)) {
          fs.mkdirSync(self.specsCache, { recursive: true });
        }

        const cache = self.getCache();
        if (!(this.uriHash in cache)) {
          const saved = JSON.stringify(spec, null, 2);
          const jsonHash = crypto.createHash('md5').update(saved).digest('hex');

          cache[this.uriHash] = {
            path: cacheDir('specs', `${jsonHash}.json`),
            original: this.uri,
            title: 'title' in spec.info ? spec.info.title : undefined,
            version: 'version' in spec.info ? spec.info.version : undefined,
          };

          fs.writeFileSync(cache[this.uriHash].path, saved);
          fs.writeFileSync(self.cacheStore, JSON.stringify(cache, null, 2));

          self.cache = cache;
        }

        return spec;
      });
  }

  saveUrl() {
    return fetch(this.uri)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unable to retrieve URL. Reason: ${res.statusText}`);
        }

        if (res.headers.get('content-type') === 'application/yaml' || /\.(yaml|yml)/.test(this.uri)) {
          return res.text().then(text => {
            return yaml.parse(text);
          });
        }

        return res.json();
      })
      .then(json => this.save(json));
  }

  saveFile() {
    return new Promise(resolve => {
      return resolve(fs.readFileSync(this.uri, 'utf8'));
    })
      .then(res => {
        if (/\.(yaml|yml)/.test(this.uri)) {
          return yaml.parse(res);
        }

        return JSON.parse(res);
      })
      .then(json => this.save(json));
  }
}

module.exports = SdkCache;
