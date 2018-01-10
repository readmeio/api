const assert = require('assert');
const nock = require('nock');

const whoami = require('../../dist/commands/whoami');
const { BUILD_URL } = require('../../dist/utils/utils');
const logger = require('../../dist/utils/console');

describe('`whoami` command', () => {
  before(() => nock.disableNetConnect());
  after(() => nock.enableNetConnect());

  it('should call `/users/me`', async () => {
    const mock = nock(BUILD_URL).get('/users/me').reply(201, { username: 'example' });

    await whoami.run();

    mock.done();

    // Need to do this on next tick, as it logs after the response
    process.nextTick(() => {
      assert(logger._flush().indexOf('example') > -1, 'Should print the username');
    });
  });
});
