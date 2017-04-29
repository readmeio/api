const fs = require('fs');
const os = require('os');
const { join } = require('path');

module.exports = (answers) => {
  return new Promise((resolve) => {
    const cwd = process.cwd();

    const folder = Math.random().toString(36).substr(2);
    const tmpDir = join(os.tmpdir(), folder);

    fs.mkdirSync(tmpDir);

    process.chdir(tmpDir);

    const init = require('../../commands/init');
    const rl = init.run().rl;

    rl.output.on('data', (data) => {
      const answer = answers.find(a => data.match(a.q));
      if (answer) {
        rl.write(answer.a);
      }
    });

    rl.on('close', () => {
      process.chdir(cwd);
      resolve(tmpDir);
    });
  });
};
