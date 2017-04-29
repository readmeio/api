const assert = require('assert');
const spawnInit = require('./spawn-init');
const { join, basename } = require('path');

describe('init command', () => {
  it('should generate new project', () => {
    const version = '1.0.0';
    const answers = [
      { q: 'Name your service', a: '\n' },
      { q: 'public or private', a: '\n' },
      { q: 'Version number', a: `${version}\n` },
      { q: 'first action', a: '\n' },
    ];

    return spawnInit(answers).then((tmpDir) => {
      const packageJson = require(join(tmpDir, 'package.json'));
      assert.equal(packageJson.name, basename(tmpDir));
      assert.equal(packageJson.private, false);
      assert.equal(packageJson.main, `${basename(tmpDir)}.js`);
      assert.equal(packageJson.version, version);
    });
  });
});
