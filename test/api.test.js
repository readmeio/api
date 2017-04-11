const assert = require('assert');
const api = require('../api');

describe('api', () => {
  describe('.error', () => {
    it('should throw error when called', () => {
      try {
        api.error('Name', { x: 1 });
      } catch (e) {
        assert.equal(e.name, 'Name');
        assert.deepEqual(e.props, { x: 1 });
        assert.equal(e.handled, true);
      }
    });
  });
});
