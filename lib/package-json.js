const fs = require('fs');
const { join } = require('path');

class PackageJson {
  constructor(packageJson, path = process.cwd()) {
    this.path = path;
    this.packageJson = packageJson;

    if (!this.packageJson) {
      try {
        this.packageJson = require(join(this.path, 'package.json'));
      } catch (e) {
        this.packageJson = {};
      }
    }
  }

  get(key, opts = { build: false }) {
    const rootProperty = this.packageJson[key];
    const buildProperty = (this.packageJson.build || {})[key];

    if (opts.build === true) return buildProperty;

    return buildProperty || rootProperty;
  }

  has(key, opts = { build: false }) {
    const existsInRoot = typeof this.packageJson[key] !== 'undefined';
    const existsInBuild = typeof (this.packageJson.build || {})[key] !== 'undefined';

    if (opts.build === true) return existsInBuild;

    return existsInRoot || existsInBuild;
  }

  set(key, value, opts = { root: false, build: false }) {
    // If the `root` option is set, then attempt to set with a priority
    // in the root as opposed to in `build`. This is useful for updating
    // the `version` property of the package.json when it hasn't
    // diverged from the base version
    if (opts.root === true) {
      if (this.packageJson.build && this.packageJson.build[key]) {
        this.packageJson.build[key] = value;
      } else {
        this.packageJson[key] = value;
      }
      return;
    }

    // If the `build` option is set, then set in `build` instead of
    // attempting to set in the root first. This is useful for updating
    // the `private` property of the package.json which when in the root
    // means that a package shouldn't be deployed to npm
    if (opts.build === true) {
      if (!this.packageJson.build) this.packageJson.build = {};
      this.packageJson.build[key] = value;
      return;
    }

    if (this.packageJson[key]) {
      // Ignore property if it's the same
      if (this.packageJson[key] === value) return;

      if (!this.packageJson.build) this.packageJson.build = {};
      this.packageJson.build[key] = value;
    } else {
      this.packageJson[key] = value;
    }
  }

  write() {
    return fs.writeFileSync(join(this.path, 'package.json'), JSON.stringify(this.packageJson, undefined, 2));
  }
}

module.exports = (...args) => new PackageJson(...args);
