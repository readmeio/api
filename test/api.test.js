const assert = require('assert');
const nock = require('nock');

const { BUILD_URL } = require('../utils/utils');
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

  describe('#do()', () => {
    const key = '123456';
    const action = 'action';
    const body = { name: 'test' };
    const responseBody = { result: 'hello world' };

    it('should call invoke', () => {
      const service = 'service';

      const invokeMock = nock(BUILD_URL)
        .post(`/services/${service}/${action}/invoke`, body)
        .basicAuth({ user: key })
        .reply(() => {
          return [200, responseBody, {}];
        });

      return api.config(key)(service).do(action, body).then((response) => {
        assert.equal(response, responseBody.result);
        invokeMock.done();
      });
    });

    it('should prefix service name with @ if it contains a slash', () => {
      const service = 'team/service';

      const invokeMock = nock(BUILD_URL)
        .post(`/services/@${service}/${action}/invoke`, body)
        .basicAuth({ user: key })
        .reply(() => {
          return [200, {}, {}];
        });

      return api.config(key)(service).do(action, body).then(() => invokeMock.done());
    });
  });
});
