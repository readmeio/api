const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

const packageJson = require('../../src/lib/package-json');

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

    describe('`opts.build`', () => {
      it('should return value if it is set in `build`', () => {
        assert.equal(packageJson({ build: { private: true } }).get('private', { build: true }), true);
        assert.equal(packageJson({ build: { private: false } }).get('private', { build: true }), false);
      });

      it('should return undefined if it is not set in `build`', () => {
        assert.equal(packageJson({ build: {} }).get('private', { build: true }), undefined);
        assert.equal(packageJson({ private: true }).get('private', { build: true }), undefined);
        assert.equal(packageJson({ private: false }).get('private', { build: true }), undefined);
      });
    });
  });

  describe('#has()', () => {
    it('should return true if the property is set on either', () => {
      assert.equal(packageJson({ name: 'name' }).has('name'), true);
      assert.equal(packageJson({ build: { name: 'build-name' } }).has('name'), true);
    });

    it('should return false if it is not set on either', () => {
      assert.equal(packageJson({}).has('name'), false);
      assert.equal(packageJson({ build: {} }).has('name'), false);
    });

    describe('`opts.build`', () => {
      it('should return true if it is set in `build` or not', () => {
        assert.equal(packageJson({ build: { private: true } }).has('private', { build: true }), true);
        assert.equal(packageJson({ build: { private: false } }).has('private', { build: true }), true);
      });

      it('should return false if it is not set in `build`', () => {
        assert.equal(packageJson({ build: {} }).has('private', { build: true }), false);
        assert.equal(packageJson({ private: true }).has('private', { build: true }), false);
        assert.equal(packageJson({ private: false }).has('private', { build: true }), false);
      });
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

    describe('`opts.root`', () => {
      it('should allow manually setting in the root if required', () => {
        const pjson = packageJson({ version: '1.0.0' });
        pjson.set('version', '2.0.0', { root: true });
        assert.equal(pjson.packageJson.version, '2.0.0');
        assert.equal(pjson.packageJson.build, undefined);
      });

      it('should not set in the root if property is set in sub object', () => {
        const pjson = packageJson({ version: '1.0.0', build: { version: '1.5.0' } });
        pjson.set('version', '2.0.0', { root: true });
        assert.equal(pjson.packageJson.version, '1.0.0');
        assert.equal(pjson.packageJson.build.version, '2.0.0');
      });
    });

    describe('`opts.build`', () => {
      it('should set in `build` object if `opts.build` is true', () => {
        const pjson = packageJson({});
        pjson.set('private', true, { build: true });

        assert.equal(pjson.packageJson.private, undefined);
        assert.equal(pjson.packageJson.build.private, true);
      });
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
