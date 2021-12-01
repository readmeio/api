const fetch = require('node-fetch');
const OpenAPIParser = require('@readme/openapi-parser');
const yaml = require('js-yaml');
const crypto = require('crypto');
const findCacheDir = require('find-cache-dir');
const pkg = require('../package.json');
const fs = require('fs');
const os = require('os');
const path = require('path');
const makeDir = require('make-dir');

let cacheDir = findCacheDir({ name: pkg.name });
if (typeof cacheDir === 'undefined') {
  // The `find-cache-dir` module returns `undefined` if the `node_modules/` directory isn't writable, or there's no
  // `package.json` in the root-most directory. If this happens, we can instead adhoc create a cache directory in the
  // users OS temp directory and store our data there.
  //
  // @link https://github.com/avajs/find-cache-dir/issues/29
  cacheDir = makeDir.sync(path.join(os.tmpdir(), pkg.name));
}

class SdkCache {
  constructor(uri) {
    /**
     * Resolve OpenAPI definition shorthand accessors from within the ReadMe API Registry.
     *
     * Examples:
     *    - @petstore/v1.0#n6kvf10vakpemvplx
     *    - @petstore#n6kvf10vakpemvplx
     *
     * @param {String} u
     * @returns {String}
     */
    const resolveReadMeRegistryAccessor = u =>
      typeof u === 'string'
        ? u.replace(/^@[a-zA-Z0-9-_]+\/?(.+)#([a-z0-9]+)$/, 'https://dash.readme.io/api/v1/api-registry/$2')
        : u;

    this.uri = resolveReadMeRegistryAccessor(uri);
    this.uriHash = SdkCache.getCacheHash(this.uri);
    this.dir = cacheDir;
    this.cacheStore = path.join(this.dir, 'cache.json');
    this.specsCache = path.join(this.dir, 'specs');

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
      // Support relative paths by resolving them against the cwd.
      this.uri = path.resolve(process.cwd(), this.uri);

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
      resolve(json);
    })
      .then(res => {
        // The `validate` method handles dereferencing for us.
        return OpenAPIParser.validate(res, {
          dereference: {
            // If circular `$refs` are ignored they'll remain in the API definition as `$ref: String`. This allows us to
            // not only do easy circular reference detection but also stringify and  save dereferenced API definitions
            // back into the cache directory.
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
        if (!fs.existsSync(self.dir)) {
          fs.mkdirSync(self.dir, { recursive: true });
        }

        if (!fs.existsSync(self.specsCache)) {
          fs.mkdirSync(self.specsCache, { recursive: true });
        }

        const cache = self.getCache();
        if (!(self.uriHash in cache)) {
          const saved = JSON.stringify(spec, null, 2);
          const jsonHash = crypto.createHash('md5').update(saved).digest('hex');

          cache[self.uriHash] = {
            path: path.join(self.specsCache, `${jsonHash}.json`),
            original: self.uri,
            title: 'title' in spec.info ? spec.info.title : undefined,
            version: 'version' in spec.info ? spec.info.version : undefined,
          };

          fs.writeFileSync(cache[self.uriHash].path, saved);
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
            return yaml.load(text);
          });
        }

        return res.json();
      })
      .then(json => this.save(json));
  }

  saveFile() {
    return new Promise(resolve => {
      resolve(fs.readFileSync(this.uri, 'utf8'));
    })
      .then(res => {
        if (/\.(yaml|yml)/.test(this.uri)) {
          return yaml.load(res);
        }

        return JSON.parse(res);
      })
      .then(json => this.save(json));
  }
}

module.exports = SdkCache;
