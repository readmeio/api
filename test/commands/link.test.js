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
    process.env.HOME_DIR = tmpPath;

    process.chdir(tmpDir);

    init(answers);
  });

  afterEach(() => {
    fs.unlinkSync(join(tmpPath, '.readme-build', 'links.json'));
    delete require.cache[require.resolve(join(tmpPath, '.readme-build', 'links.json'))];
    process.chdir(cwd);
  });

  it('should create a global link when ran in a producer directory', () => {
    const link = require('../../commands/link');
    link.run(['link']);
    const links = require(join(tmpPath, '.readme-build', 'links.json'));
    assert.deepEqual(links, {
      linkedServices: {
        [answers.name]: process.cwd(),
      },
      localLinks: {},
    });
  });

  it('should create a local link when passed a service', () => {
    const link = require('../../commands/link');
    link.run(['link']);
    link.run(['link', answers.name]);
    const links = require(join(tmpPath, '.readme-build', 'links.json'));
    assert.deepEqual(links, {
      linkedServices: {
        [answers.name]: process.cwd(),
      },
      localLinks: {
        [process.cwd()]: [answers.name],
      },
    });
  });
});
