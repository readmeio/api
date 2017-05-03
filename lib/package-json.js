class PackageJson {
  constructor(packageJson) {
    this.packageJson = packageJson;
  }

  get(key) {
    return (this.packageJson.build || {})[key] || this.packageJson[key];
  }
}

module.exports = packageJson => new PackageJson(packageJson);
