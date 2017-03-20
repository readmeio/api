require('colors');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const exec = require('child_process').exec;

module.exports.run = () => {
  console.log('We are going to walk you through initial setup!'.green);
  console.log('');

  // TODO: Make sure there isn't already a package.json
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Name your service',
      default: process.cwd().split('/').slice(-1)[0],
    },
    {
      type: 'list',
      choices: [
        'public',
        'private',
      ],
      name: 'internal',
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

  inquirer.prompt(questions).then((answers) => {
    fs.readFile(path.join(__dirname, '../utils/stub.js'), 'utf8', (err, data) => {
      const stub = data.replace('<<action>>', answers.action);

      fs.writeFileSync(`${answers.name}.js`, stub);

      const packageJson = {
        name: answers.name,
        version: answers.version,
        main: `${answers.name}.js`,
        private: answers.internal === 'private',
        dependencies: {
          'api-build': 'latest',
        },
      };

      const README = `Welcome to ${answers.name}!`;
      fs.writeFileSync('readme.md', README);

      fs.writeFileSync('package.json', JSON.stringify(packageJson, undefined, 2));

      console.log(`Running ${'npm install'.yellow}...`);
      exec('npm install', () => {
        const filename = `${answers.name}.js`;
        console.log(`\nGreat! We've created it! Just edit ${filename.yellow} and type ${'api deploy'.yellow} when you are ready!\n`);
      });
    });
  });
};
