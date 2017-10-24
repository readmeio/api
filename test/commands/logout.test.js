const assert = require('assert');
const nock = require('nock');

const logout = require('../../src/commands/logout');
const { BUILD_URL } = require('../../src/utils/utils');
const logger = require('../../src/utils/console');

describe('`logout` command', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should call `/logout`', async () => {
    const mock = nock(BUILD_URL).post('/logout').reply(200);

    return logout.run().then(() => {
      mock.done();

      // Need to do this on next tick, as it logs after the response
      process.nextTick(() => {
        assert(logger._flush().indexOf('You have been logged out') > -1, 'Should show logout message');
      });
    });
  });
});
