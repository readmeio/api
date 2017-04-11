const path = require('path');
const assert = require('assert');

const utils = require('../../utils/utils');

describe('utils', () => {
  describe('parseErrors', () => {
    const event = {
      name: 'createUser',
      entrypoint: path.join(__dirname, 'doc-fixture.js'),
      data: { x: 1 },
    };

    it('should create error for api.error calls', () => {
      const error = new Error();
      error.name = 'ValidationError';
      error.handled = true;

      const e = utils.parseErrors(event, error);
      assert.equal(e.name, error.name);
      assert.equal(e.message, 'Error');
      assert.deepEqual(e.data, event.data);
      assert(e.handled);
    });

    it('should replace message if template string', () => {
      const error = new Error();
      error.name = 'TemplateError';
      error.handled = true;
      error.props = { test: 10 };

      const e = utils.parseErrors(event, error);
      assert.equal(e.name, error.name);
      assert.equal(e.message, 'Error 10');
      assert.deepEqual(e.data, event.data);
      assert(e.handled);
    });

    it('should handle errors not in docs', () => {
      const error = new Error();
      error.name = 'UnknownError';
      error.handled = true;

      const e = utils.parseErrors(event, error);
      assert.equal(e.name, 'Error');
      assert.equal(e.message, error.name);
      assert.deepEqual(e.data, event.data);
      assert(e.handled);
    });
  });
});
