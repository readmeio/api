module.exports.usage = `Set up a new service

Usage: api init

Asks a series of questions which will be used to generate a new service in the current directory`;

module.exports.category = 'basic';
module.exports.weight = 1;

require('colors');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const semver = require('semver');
const utils = require('../utils/utils');
const validName = require('validate-npm-package-name');
const createEnquirer = require('../lib/enquirer');
const packageJson = require('../lib/package-json');

module.exports.run = () => {
  const enquirer = createEnquirer();

  console.log('');
  console.log('Let\'s create your new API!'.cyan);
  console.log('');
  console.log('ReadMe Build is a really, really simple way to create awesome APIs.');
  console.log('Learn more at https://readme.build'.grey);
  console.log('');

  let existingPackageJson;

  try {
    existingPackageJson = require(path.join(process.cwd(), 'package.json'));
  } catch (e) {
    existingPackageJson = {};
  }

  return enquirer.ask(module.exports.questions(existingPackageJson)).then(module.exports.init);
};

module.exports.questions = (existingPackageJson) => {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Name your service',
      default: existingPackageJson.name || path.basename(process.cwd()),
      validate: (input) => {
        const valid = validName(input);
        if (!valid.validForNewPackages) {
          // npms package used to allow this, so the warning
          // isn't very good for our case
          return (valid.errors || valid.warnings.map(warning => warning.replace('can no longer', 'cannot'))).join('\n');
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version number',
      default: existingPackageJson.version || '0.0.1',
      validate: (v) => {
        if (!semver.valid(v)) {
          return `${v} is not a valid semver version`;
        }
        return true;
      },
    },
    {
      type: 'message',
      message: () => {
        console.log('Create your first action'.yellow);
        console.log(`${'Each'.grey} ${'service'.cyan} ${'is made up of'.grey} ${'actions'.cyan}${'. They\'re similar to API endpoints.'.grey}`);
      },
    },
    {
      type: 'input',
      name: 'action',
      message: 'What is the name of your first action?',
      default: 'helloWorld',
    },
  ];
};

module.exports.init = (answers) => {
  const data = fs.readFileSync(path.join(__dirname, '../utils/stub.js'), 'utf8');
  const stub = data.replace(/<<action>>/g, answers.action).replace(/<<name>>/g, answers.name);

  fs.writeFileSync(`${answers.name}.js`, stub);

  // Need to initialise the package.json object down here
  // so that process.cwd() is different in tests
  const pjson = packageJson();
  pjson.set('name', answers.name);
  pjson.set('version', answers.version);
  pjson.set('main', `${answers.name}.js`);
  pjson.write();

  // Only add a readme if one does not exist
  if (!fs.existsSync('readme.md')) {
    fs.writeFileSync('readme.md', `# ${answers.name}!\n\nWelcome to ${answers.name}\n`);
  }

  if (process.env.NODE_ENV === 'testing') {
    return undefined;
  }

  console.log(`Running ${'npm install'.yellow}...`);
  return exec('npm install api --save', () => {
    const filename = `${answers.name}.js`;

    const name = (utils.getGitConfig('user.name') || 'Julie').split(' ')[0];

    console.log(`\nGreat! We've set up your api!

1. Try running it locally first:

  ${'$'.grey} ${(`api local sayHello name=${name}`).yellow}

2. Edit ${filename.cyan} and build your API!

3. When you're ready to release, run:

  ${'$'.grey} ${('api deploy').yellow}
`);
  });
};
