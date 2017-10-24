const assert = require('assert');
const nock = require('nock');

const secret = require('../../src/commands/secret');
const { BUILD_URL } = require('../../src/utils/utils');
const logger = require('../../src/utils/console');

describe('`secret` command', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should not throw if nothing provided', () => {
    assert.doesNotThrow(() => {
      secret.run(['secret']).catch(e => e);
    }, TypeError);
  });

  it('should log if no service provided', () => {
    return secret.run(['secret']).catch(() => {
      assert(logger._flush().indexOf('You must provide a service') > -1, 'Should show error message');
    });
  });

  it('should log if no secrets provided', () => {
    return secret.run(['secret', 'service']).catch(() => {
      assert(logger._flush().indexOf('You must provide a secret in the form of key=value') > -1, 'Should show error message');
    });
  });

  it('should call `/secret`', async () => {
    const mock = nock(BUILD_URL).post('/secrets/service', { key: 'a', value: '1' }).reply(200);

    return secret.run(['secret', 'service', 'a=1'], {}).then(() => {
      mock.done();
    });
  });
});
