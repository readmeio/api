/* Link file format:

  ~/.readme-build/links.json

  {
    linkedServices: { // Services linked globally that are available
      math: '~/Desktop/math/',
    },
    localLinks: { // Services that the consumer have linked
      '~/Desktop/consumer/': ['math'],
    },
  }
*/

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { init } = require('../../commands/init');
const { join } = require('path');

let cwd;
let tmpDir;
let tmpPath;

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
    process.env.HOME_DIR = tmpPath;

    process.chdir(tmpDir);

    init(answers);

    const link = require('../../commands/link');
    link.run(['link']);
    link.run(['link', answers.name]);
  });

  afterEach(() => {
    fs.unlinkSync(join(tmpPath, '.readme-build', 'links.json'));
    delete require.cache[require.resolve(join(tmpPath, '.readme-build', 'links.json'))];
    process.chdir(cwd);
  });

  it('should remove all links if removing link from service', () => {
    const unlink = require('../../commands/unlink');
    unlink.run(['unlink']);
    const links = require(join(tmpPath, '.readme-build', 'links.json'));
    assert.deepEqual(links, {
      linkedServices: {},
      localLinks: {
        [process.cwd()]: [],
      },
    });
  });

  it('should unlink a specific service', () => {
    const unlink = require('../../commands/unlink');
    unlink.run(['unlink', answers.name]);
    const links = require(join(tmpPath, '.readme-build', 'links.json'));
    assert.deepEqual(links, {
      linkedServices: {
        [answers.name]: process.cwd(),
      },
      localLinks: {
        [process.cwd()]: [],
      },
    });
  });
});
