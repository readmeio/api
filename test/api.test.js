const assert = require('assert');
const nock = require('nock');

const { BUILD_URL } = require('../utils/utils');
const api = require('../api');
const logger = require('../utils/console');

describe('api', () => {
  describe('#config()', () => {
    it('should take an api key and allow to run a service', () => {
      const newApi = api.config('1234');
      assert.equal(typeof newApi, 'function');
      assert.equal(typeof newApi.run, 'function');
      assert.equal(typeof newApi.file, 'function');
    });
  });

  describe('#run()', () => {
    const key = '123456';
    const action = 'action';
    const body = { name: 'test', number: 1 };
    const responseBody = 'hello world';

    it('should call invoke', () => {
      const service = 'service';

      const invokeMock = nock(BUILD_URL)
        .post(`/run/${service}/${action}`, (passedBody) => {
          return passedBody.includes(`form-data; name="data"\r\n\r\n${JSON.stringify(body)}`);
        })
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
        .post(`/run/@${service}/${action}`, (passedBody) => {
          return passedBody.includes(`form-data; name="data"\r\n\r\n${JSON.stringify(body)}`);
        })
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
