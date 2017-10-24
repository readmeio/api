const assert = require('assert');
const nock = require('nock');

const { BUILD_URL } = require('../../src/utils/utils');
const { run } = require('../../src/commands/update');

describe('update command', () => {
  it('should throw if no service provided', () => {
    assert.throws(() => {
      run(['update']);
    }, 'Missing service');
  });

  const service = 'service';

  it('should make a request to update', () => {
    const updateMock = nock(BUILD_URL)
      .put(`/services/${service}/update`)
      .reply(() => {
        return [200, { version: '1.0.0' }, {}];
      });

    return run(['update', service], {}).then(() => {
      updateMock.done();
    });
  });

  it('should allow you to pass the version', () => {
    const version = '1.5.0';

    const updateMock = nock(BUILD_URL)
      .put(`/services/${service}/update`, { version })
      .reply(() => {
        return [200, { version: '1.0.0' }, {}];
      });

    return run(['update', service, version], {}).then(() => {
      updateMock.done();
    });
  });

  it('should allow you to pass the team', () => {
    const team = 'team-name';

    const updateMock = nock(BUILD_URL)
      .put(`/services/${service}/update`, { team })
      .reply(() => {
        return [200, { version: '1.0.0' }, {}];
      });

    return run(['update', service], { team }).then(() => {
      updateMock.done();
    });
  });

  it('should prefix the service with @ if necessary', () => {
    const teamService = 'team/service';
    const updateMock = nock(BUILD_URL)
      .put(`/services/@${teamService}/update`)
      .reply(() => {
        return [200, { version: '1.0.0' }, {}];
      });

    return run(['update', teamService], {}).then(() => {
      updateMock.done();
    });
  });
});

