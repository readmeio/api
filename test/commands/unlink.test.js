const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { init } = require('../../commands/init');
const { join } = require('path');

let cwd;
let tmpDir;
let tmpPath;
let linksPath;

describe('unlink command', () => {
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

    const link = require('../../commands/link');
    link.run(['link']);
    link.run(['link', answers.name]);
  });

  afterEach(() => {
    fs.unlinkSync(linksPath);
    delete require.cache[require.resolve(linksPath)];
    process.chdir(cwd);
  });

  it('should remove all links if removing link from service', () => {
    const unlink = require('../../commands/unlink');
    unlink.run(['unlink']);
    const links = require(linksPath);
    assert.deepEqual(links, {
      services: {},
      directories: {
        [process.cwd()]: [],
      },
    });
  });

  it('should unlink a specific service', () => {
    const unlink = require('../../commands/unlink');
    unlink.run(['unlink', answers.name]);
    const links = require(linksPath);
    assert.deepEqual(links, {
      services: {
        [answers.name]: process.cwd(),
      },
      directories: {
        [process.cwd()]: [],
      },
    });
  });
});
