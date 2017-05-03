const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

const packageJson = require('../../lib/package-json');

describe('package-json', () => {
  describe('constructor', () => {
    it('should default path to `process.cwd()`', () => {
      assert.equal(packageJson().path, process.cwd());
    });

    it('should default packageJson to `path.join(this.path, \'package.json\')`', () => {
      assert.equal(packageJson().packageJson.name, require('../../package.json').name);
    });

    it('should default to empty object if no package.json found', () => {
      const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), '/'));
      assert.deepEqual(packageJson(null, tmpdir).packageJson, {});
    });
  });

  describe('#get()', () => {
    it('should return the property from `build` if set', () => {
      assert.equal(packageJson({ name: 'name', build: { name: 'build-name' } }).get('name'), 'build-name');
    });

    it('should return the property from normal if not set', () => {
      assert.equal(packageJson({ name: 'name', build: {} }).get('name'), 'name');
      assert.equal(packageJson({ name: 'name' }).get('name'), 'name');
    });
  });

  describe('#set()', () => {
    it('should set the property in `build` if it is already set in main', () => {
      const pjson = packageJson({ name: 'name' });
      pjson.set('name', 'build-name');
      assert.equal(pjson.packageJson.build.name, 'build-name');
    });

    it('should not set the property in `build` if it is the same as main', () => {
      const pjson = packageJson({ name: 'name' });
      pjson.set('name', 'name');
      assert.equal(pjson.packageJson.name, 'name');
      assert.equal(pjson.packageJson.build, undefined);
    });

    it('should set it in the main if it is not set there', () => {
      const pjson = packageJson({});
      pjson.set('name', 'name');
      assert.equal(pjson.packageJson.name, 'name');
    });
  });

  describe('#write()', () => {
    it('should write to disk in a given path', () => {
      const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), '/'));
      const pjson = packageJson({ name: 'test' }, tmpdir);
      assert.equal(pjson.path, tmpdir);

      pjson.write();
      assert.equal(fs.existsSync(path.join(tmpdir, 'package.json')), true);
      assert.deepEqual(JSON.parse(fs.readFileSync(path.join(tmpdir, 'package.json'), 'utf8')), { name: 'test' });
    });
  });
});
