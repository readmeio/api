const assert = require('assert');
const nock = require('nock');

const { BUILD_URL } = require('../utils/utils');
const api = require('../api');
const logger = require('../utils/console');

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

    it('should pass through if an Error object is provided', () => {
      const msg = 'This is an error object';
      const err = new Error(msg);
      try {
        api.error(err);
      } catch (e) {
        assert.equal(e.name, 'Error');
        assert.equal(e.message, msg);
      }
    });
  });

  describe('#run()', () => {
    const key = '123456';
    const action = 'action';
    const body = { name: 'test' };
    const responseBody = 'hello world';

    it('should call invoke', () => {
      const service = 'service';

      const invokeMock = nock(BUILD_URL)
        .post(`/run/${service}/${action}`, body)
        .basicAuth({ user: key })
        .reply(() => {
          return [200, responseBody, {}];
        });

      return api.config(key)(service).run(action, body).then((response) => {
        assert.equal(response, responseBody);
        invokeMock.done();
      });
    });

    it('should prefix service name with @ if it contains a slash', () => {
      const service = 'team/service';

      const invokeMock = nock(BUILD_URL)
        .post(`/run/@${service}/${action}`, body)
        .basicAuth({ user: key })
        .reply(() => {
          return [200, {}, {}];
        });

      return api.config(key)(service).run(action, body).then(() => invokeMock.done());
    });

    it('should log if demo API key used', async () => {
      await api.config('demo_asdsdsa')('service').run('action', 'body');

      assert(logger._flush().indexOf('This is a demo API key!') > -1, 'Should show error message');
    });
  });
});
