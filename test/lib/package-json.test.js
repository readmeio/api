const assert = require('assert');

const packageJson = require('../../lib/package-json');

describe('package-json', () => {
  describe('#get()', () => {
    it('should return the property from `build` if set', () => {
      assert.equal(packageJson({ name: 'name', build: { name: 'build-name' } }).get('name'), 'build-name');
    });

    it('should return the property from normal if not set', () => {
      assert.equal(packageJson({ name: 'name', build: {} }).get('name'), 'name');
      assert.equal(packageJson({ name: 'name' }).get('name'), 'name');
    });
  });
});
