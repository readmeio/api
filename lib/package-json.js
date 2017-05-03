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

  get(key) {
    return (this.packageJson.build || {})[key] || this.packageJson[key];
  }

  set(key, value, opts = { root: false }) {
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
