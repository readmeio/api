const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { init, questions } = require('../../dist/commands/init');
const { join, basename } = require('path');

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
    const answers = {
      name: 'name',
      version: '1.0.0',
      action: 'sayHello',
    };

    init(answers);

    const packageJson = require(join(tmpDir, 'package.json'));
    const main = `${answers.action}.js`;
    assert.equal(packageJson.name, answers.name);
    assert.equal(packageJson.version, answers.version);

    const readme = fs.readFileSync(join(tmpDir, 'readme.md'), 'utf8');
    assert(readme.indexOf(`# ${answers.name}`) > -1, 'Should have readme title');

    const mainFile = fs.readFileSync(join(tmpDir, 'endpoints', main), 'utf8');
    assert(mainFile.indexOf('module.exports =') > -1, 'Should have default action');
  });

  it('should extend existing package.json', () => {
    const existingPackage = fs.readFileSync(join(__dirname, '../fixtures/existing-package.json'));
    fs.writeFileSync('package.json', existingPackage);

    const answers = {
      name: 'name',
      version: '1.0.0',
      action: 'sayHello',
    };

    init(answers);

    const existingPackageJson = require(join(__dirname, '../fixtures/existing-package.json'));
    const packageJson = require(join(tmpDir, 'package.json'));

    assert.deepEqual(packageJson, Object.assign({}, existingPackageJson, {
      build: {
        name: answers.name,
        version: answers.version,
      },
    }));
  });

  it('should not add properties to `build` for matching values', () => {
    const existingPackage = fs.readFileSync(join(__dirname, '../fixtures/existing-package.json'));
    fs.writeFileSync('package.json', existingPackage);

    const existingPackageJson = require(join(__dirname, '../fixtures/existing-package.json'));

    const answers = {
      name: existingPackageJson.name,
      version: 'v1.0.0',
      action: 'sayHello',
    };

    init(answers);

    const packageJson = require(join(tmpDir, 'package.json'));

    assert.deepEqual(packageJson, Object.assign({}, existingPackageJson, {
      build: {
        version: 'v1.0.0',
      },
    }));
  });

  it('should leave existing readme', () => {
    const readme = '# This is an already existing readme file';
    fs.writeFileSync('readme.md', readme);

    const answers = {
      name: 'name',
      version: '1.0.0',
      action: 'sayHello',
    };

    init(answers);

    assert.equal(fs.readFileSync('readme.md', 'utf8'), readme);
  });

  describe('questions', () => {
    describe('name', () => {
      it('should offer existing package.json as a name', () => {
        const name = 'existing';
        const nameQuestion = questions({ name }).find(question => question.name === 'name');

        assert.equal(nameQuestion.default, name);
      });

      it('should give lowercased current folder directory if no package.json', () => {
        const nameQuestion = questions({}).find(question => question.name === 'name');

        assert.equal(nameQuestion.default, basename(tmpDir).toLowerCase());
      });

      it('should error for invalid package names', () => {
        const nameQuestion = questions({}).find(question => question.name === 'name');
        assert.equal(nameQuestion.validate('!'), 'name cannot contain special characters ("~\'!()*")');
        assert.equal(nameQuestion.validate('  name'), 'name cannot contain leading or trailing spaces\nname can only contain URL-friendly characters');
      });
    });

    describe('version', () => {
      it('should offer existing package.json as a version', () => {
        const version = '1.0.1';
        const versionQuestion = questions({ version }).find(question => question.name === 'version');

        assert.equal(versionQuestion.default, version);
      });
    });
  });
});
