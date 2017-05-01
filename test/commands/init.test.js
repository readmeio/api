const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { init } = require('../../commands/init');
const { join } = require('path');

let cwd;
let tmpDir;

describe('init command', () => {
  beforeEach(() => {
    cwd = process.cwd();

    tmpDir = fs.mkdtempSync(`${os.tmpdir()}/`);

    process.chdir(tmpDir);
  });

  afterEach(() => {
    process.chdir(cwd);
  });

  it('should generate new project', () => {
    const version = '1.0.0';
    const answers = {
      name: 'name',
      private: 'public',
      version: '1.0.0',
      action: 'sayHello',
    };

    init(answers);

    const packageJson = require(join(tmpDir, 'package.json'));
    const main = `${answers.name}.js`;
    assert.equal(packageJson.name, answers.name);
    assert.equal(packageJson.private, false);
    assert.equal(packageJson.main, main);
    assert.equal(packageJson.version, version);

    const readme = fs.readFileSync(join(tmpDir, 'readme.md'), 'utf8');
    assert(readme.indexOf(`# ${answers.name}`) > -1, 'Should have readme title');

    const mainFile = fs.readFileSync(join(tmpDir, main), 'utf8');
    assert(mainFile.indexOf('api.create(\'sayHello\'') > -1, 'Should have default action');
  });
});
