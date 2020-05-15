const fetch = require('node-fetch');
const chalk = require('chalk');
const SwaggerParser = require('@apidevtools/swagger-parser');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const yaml = require('yaml');
const crypto = require('crypto');
const findCacheDir = require('find-cache-dir');
const pkg = require('../package.json');
const fs = require('fs');

const cacheDir = findCacheDir({ name: pkg.name, thunk: true });

console.logx = obj => {
  // eslint-disable-next-line global-require
  console.log(require('util').inspect(obj, false, null, true));
};

class SdkCache {
  constructor(uri) {
    this.uri = uri;
    this.uriHash = SdkCache.getCacheHash(this.uri);
    this.dir = cacheDir();
    this.cacheStore = cacheDir('cache.json');
    this.specsCache = cacheDir('specs');
  }

  static getCacheHash(file) {
    return crypto.createHash('md5').update(file).digest('hex');
  }

  getCache() {
    let cache = {};
    if (fs.existsSync(this.cacheStore)) {
      cache = JSON.parse(fs.readFileSync(this.cacheStore, 'utf8'));
    }

    return cache;
  }

  load() {
    const cache = this.getCache();

    if (!(this.uriHash in cache)) {
      throw new Error(
        `Please run \`npx api install ${this.uri}\` to install this SDK's OpenAPI document before using it.`
      );
    }

    return JSON.parse(fs.readFileSync(cache[this.uriHash].path, 'utf8'));
  }

  save(json) {
    const self = this;

    if (json.swagger) {
      throw new Error('Sorry, this module only supports OpenAPI documents.');
    }

    return new Promise(resolve => {
      return resolve(json);
    })
      .then(res => {
        return SwaggerParser.validate(res).catch(err => {
          if (/is not a valid openapi api definition/i.test(err.message)) {
            throw new Error("Sorry, it doesn't look like that is a valid OpenAPI document.");
          }

          throw err;
        });
      })
      .then(res => {
        console.log(chalk.green('Dereferencing so it can easily handled...'));
        return $RefParser.dereference(res);
      })
      .then(async res => {
        if (!fs.existsSync(self.dir)) {
          fs.mkdirSync(self.dir, { recursive: true });
        }

        if (!fs.existsSync(self.specsCache)) {
          fs.mkdirSync(self.specsCache, { recursive: true });
        }

        const cache = self.getCache();
        if (this.uriHash in cache) {
          console.log(chalk.green('The specification is already installed.'));
        } else {
          const spec = JSON.stringify(res, null, 2);
          const jsonHash = crypto.createHash('md5').update(spec).digest('hex');

          cache[this.uriHash] = {
            path: cacheDir('specs', `${jsonHash}.json`),
            original: this.uri,
            title: 'title' in res.info ? res.info.title : undefined,
            version: 'version' in res.info ? res.info.version : undefined,
          };

          fs.writeFileSync(cache[this.uriHash].path, spec);
          fs.writeFileSync(self.cacheStore, JSON.stringify(cache, null, 2));

          console.log(chalk.green('Installation complete!'));
        }
      });
  }

  saveUrl() {
    return fetch(this.uri)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Unable to retrieve URL. Reason: ${res.statusText}`);
        }

        if (res.headers.get('content-type') === 'application/yaml' || /\.(yaml|yml)/.test(this.uri)) {
          console.log(chalk.green('Converting YAML to JSON...'));
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
          console.log(chalk.green('Converting YAML to JSON...'));
          return yaml.parse(res);
        }

        return JSON.parse(res);
      })
      .then(json => this.save(json));
  }
}

module.exports = SdkCache;
