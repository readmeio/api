module.exports.usage = 'Displays this usage information';

const fs = require('fs');
const path = require('path');

const commands = fs.readdirSync(__dirname).map(getAliases);

function getAliases(file) {
  const command = require(path.join(__dirname, file));
  return {
    cmd: file.replace('.js', ''),
    shortUsage: (command.usage || '').split('\n')[0],
    usage: (command.usage || ''),
  };
}

function singleUsage(command) {
  console.log(command.usage || `\`${command.cmd}\` Not yet documented`);
  process.exit(0);
}

module.exports.run = (args) => {
  if (args && args[1]) {
    const command = commands.find(cmd => args[1] === cmd.cmd);
    if (command) return singleUsage(command);
  }

  console.log(`
Usage: api <command>

${
  commands
    .map(cmd => `  api ${cmd.cmd} ${cmd.shortUsage ? `# ${cmd.shortUsage}` : ''}`)
    .join('\n')
}
`);

  return process.exit(0);
};
