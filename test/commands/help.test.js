const assert = require('assert');
const help = require('../../dist/commands/help');
const logger = require('../../dist/utils/console');

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
