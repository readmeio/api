const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { join } = require('path');
const { init } = require('../../commands/init');
const link = require('../../commands/link');

let cwd;
let tmpDir;
let tmpPath;
let linksPath;

describe('link command', () => {
  const answers = {
    name: 'name',
    version: '1.0.0',
    action: 'sayHello',
  };

  beforeEach(() => {
    cwd = process.cwd();

    tmpPath = `${os.tmpdir()}/`;
    tmpDir = fs.mkdtempSync(tmpPath);
    linksPath = join(tmpPath, '.readme-build', 'links.json');
    process.env.HOME_DIR = tmpPath;

    process.chdir(tmpDir);

    init(answers);
  });

  afterEach(() => {
    fs.unlinkSync(linksPath);
    delete require.cache[require.resolve(linksPath)];
    process.chdir(cwd);
  });

  it('should create a global link when ran in a producer directory', () => {
    link.run(['link']);
    const links = require(linksPath);
    assert.deepEqual(links, {
      services: {
        [answers.name]: process.cwd(),
      },
      directories: {},
    });
  });

  it('should create a local link when passed a service', () => {
    link.run(['link']);
    link.run(['link', answers.name]);
    const links = require(linksPath);
    assert.deepEqual(links, {
      services: {
        [answers.name]: process.cwd(),
      },
      directories: {
        [process.cwd()]: [answers.name],
      },
    });
  });
});
