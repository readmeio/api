module.exports.usage = `Init a new service

Usage: api init

Asks a series of questions which will be used to generate a new service in the current directory`;

require('colors');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const validName = require('validate-npm-package-name');
const createEnquirer = require('../lib/enquirer');

module.exports.run = () => {
  const enquirer = createEnquirer();

  console.log('We are going to walk you through initial setup!'.green);
  console.log('');

  // TODO: Make sure there isn't already a package.json
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Name your service',
      default: process.cwd().split('/').slice(-1)[0],
      validate: (input) => {
        const valid = validName(input);
        if (!valid.validForNewPackages) {
          const warnings = [];
          if (valid.warnings) {
            for (const warning of valid.warnings) {
              // npms package used to allow this, so the warning
              // isn't very good for our case
              warnings.push(warning.replace('can no longer', 'cannot'));
            }
          }
          return valid.errors || warnings;
        }
        return true;
      },
    },
    {
      type: 'list',
      choices: [
        'public',
        'private',
      ],
      name: 'private',
      message: 'Should it be public or private?',
      default: 'public',
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version number',
      default: '1.0.0',
    },
    {
      type: 'input',
      name: 'action',
      message: 'What is the name of your first action?',
      default: 'sayHello',
    },
  ];

  return enquirer.ask(questions).then(module.exports.init);
};

module.exports.init = (answers) => {
  const data = fs.readFileSync(path.join(__dirname, '../utils/stub.js'), 'utf8');
  const stub = data.replace(/<<action>>/g, answers.action);

  fs.writeFileSync(`${answers.name}.js`, stub);

  const packageJson = {
    name: answers.name,
    version: answers.version,
    main: `${answers.name}.js`,
    private: answers.private === 'private',
  };

  fs.writeFileSync('readme.md', `# ${answers.name}!\n\nWelcome to ${answers.name}\n`);
  fs.writeFileSync('package.json', JSON.stringify(packageJson, undefined, 2));

  if (process.env.NODE_ENV === 'testing') {
    return undefined;
  }

  console.log(`Running ${'npm install'.yellow}...`);
  return exec('npm install api-build --save', () => {
    const filename = `${answers.name}.js`;
    console.log(`\nGreat! We've created it! Just edit ${filename.yellow} and type ${'api deploy'.yellow} when you are ready!\n`);
  });
};
