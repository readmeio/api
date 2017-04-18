const assert = require('assert');
const docs = require('../../commands/docs');
const logger = require('../../utils/console');

describe.skip('docs command', () => {
  it('should output built docs', () => {
    docs.run();
    const output = logger._flush();
    assert(output.indexOf('name: \'docsTest\'') > -1, 'Should output docs information');
    assert(output.indexOf('description: \'This is an example for docs.test.js\'') > -1, 'Should output docs information');
  });
});
