const assert = require('assert');
const help = require('../../src/commands/help');
const logger = require('../../src/utils/console');

describe('help command', () => {
  it('should output help information', () => {
    help.run();
    assert(logger._flush().indexOf('Usage: api <command>') > -1, 'Should output help information');
  });

  it('should output specific command help information', () => {
    help.run(['help', 'deploy']);
    assert(logger._flush().indexOf('Deploys a service to build') > -1, 'Should output help information');
  });
});
