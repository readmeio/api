const path = require('path');
const assert = require('assert');
const fs = require('fs');
const buildDocs = require('build-docs');

const utils = require('../../src/utils/handler-utils');

describe('handler-utils', () => {
  describe('.error', () => {
    it('should throw error when called', () => {
      try {
        utils.error('Name', { x: 1 });
      } catch (e) {
        assert.equal(e.name, 'Name');
        assert.deepEqual(e.props, { x: 1 });
        assert.equal(e.handled, true);
      }
    });

    it('should pass through if an Error object is provided', () => {
      const msg = 'This is an error object';
      const err = new Error(msg);
      try {
        utils.error(err);
      } catch (e) {
        assert.equal(e.name, 'Error');
        assert.equal(e.message, msg);
      }
    });
  });

  describe('parseErrors', () => {
    const docFile = path.join(__dirname, 'doc-fixture.js');
    const event = {
      name: 'createUser',
      data: { x: 1 },
      errors: { createUser: buildDocs(fs.readFileSync(docFile)).errors.toString() },
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

    it('should handle thrown errors', () => {
      const message = 'error message';
      const error = new Error(message);
      error.name = 'UnknownError';

      const e = utils.parseErrors(event, error);
      assert.equal(e.name, 'UnknownError');
      assert.equal(e.message, message);
      assert.deepEqual(e.data, event.data);
      assert.equal(e.handled, false);
    });
  });
});
