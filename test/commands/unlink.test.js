const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { init } = require('../../commands/init');
const { join } = require('path');
const link = require('../../commands/link');
const unlink = require('../../commands/unlink');

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

    link.run(['link']);
    link.run(['link', answers.name]);
  });

  afterEach(() => {
    fs.unlinkSync(linksPath);
    delete require.cache[require.resolve(linksPath)];
    process.chdir(cwd);
  });

  it('should remove all links if removing link from service', () => {
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
