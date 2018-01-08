module.exports.usage = 'Displays this usage information';
module.exports.category = 'utility';
module.exports.weight = 1;

const fs = require('fs');
const path = require('path');

const console = require('../utils/console');
const exit = require('../utils/exit');

const commands = fs.readdirSync(__dirname).map(getAliases).filter(Boolean);

function getAliases(file) {
  if (!file.match(/.js$/)) return undefined;
  const command = require(path.join(__dirname, file));
  return {
    cmd: file.replace('.js', ''),
    shortUsage: (command.usage || '').split('\n')[0],
    usage: (command.usage || ''),
    category: (command.category || ''),
    weight: (command.weight || 100),
  };
}

function singleUsage(command) {
  console.log(command.usage || `\`${command.cmd}\` Not yet documented`);
  return exit(0);
}

module.exports.run = (args) => {
  console.log('');
  console.log('Usage: api <command>');

  if (args && args[1]) {
    const command = commands.find(cmd => args[1] === cmd.cmd);
    if (command) return singleUsage(command);
  }

  const categories = {
    basic: {
      desc: 'Commands for getting started',
      commands: [],
    },
    using: {
      desc: 'Run APIs in the command line',
      commands: [],
    },
    utility: {
      desc: 'Utility functions',
      commands: [],
    },
  };

  const pad = text => `${text}               `.substr(0, 15);

  commands.forEach((cmd) => {
    if (cmd.category) {
      categories[cmd.category].commands.push({
        text: `  ${'$'.grey} ${pad(`api ${cmd.cmd}`)} ${cmd.shortUsage ? cmd.shortUsage.grey : ''}`,
        weight: cmd.weight,
      });
    }
  });

  for (const cat in categories) {
    const category = categories[cat];
    console.log('');
    console.log(category.desc);
    category.commands.sort((a, b) => a.weight - b.weight);
    category.commands.forEach(command => console.log(command.text));
  }

  console.log('');
  console.log(`Learn more with ${'api help <command>'.yellow}`.grey);
  console.log('');

  let existingPackageJson;
  try {
    existingPackageJson = require(path.join(process.cwd(), 'package.json'));
  } catch (e) {
    existingPackageJson = {};
  }

  const alreadySetup = existingPackageJson.dependencies && existingPackageJson.dependencies.api;

  if (alreadySetup) {
    console.log('Ready to deploy?'.green);
    console.log(`Run ${'api deploy'.yellow} to upload your API!`);
    console.log('');
  } else {
    console.log('Just getting started?'.green);
    console.log(`Run ${'api init'.yellow} to set up your new API!`);
    console.log('');
  }

  return exit(0);
};

