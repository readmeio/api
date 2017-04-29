const assert = require('assert');
const fs = require('fs');
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
      const name = basename(tmpDir);
      const main = `${name}.js`;
      assert.equal(packageJson.name, name);
      assert.equal(packageJson.private, false);
      assert.equal(packageJson.main, main);
      assert.equal(packageJson.version, version);

      const readme = fs.readFileSync(join(tmpDir, 'readme.md'), 'utf8');
      assert(readme.indexOf(`# ${name}`) > -1, 'Should have readme title');

      const mainFile = fs.readFileSync(join(tmpDir, main), 'utf8');
      assert(mainFile.indexOf('api.create(\'sayHello\'') > -1, 'Should have default action');
    });
  });
});
