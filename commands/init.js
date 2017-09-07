module.exports.usage = `Set up a new service

Usage: api init

Asks a series of questions which will be used to generate a new service in the current directory`;

module.exports.category = 'basic';
module.exports.weight = 1;

require('colors');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const utils = require('../utils/utils');
const validName = require('validate-npm-package-name');
const createEnquirer = require('../lib/enquirer');
const packageJson = require('../lib/package-json');
const exit = require('../utils/exit');

module.exports.run = () => {
  const enquirer = createEnquirer();

  console.log('');
  console.log('Let\'s create your new API!'.cyan);
  console.log('');
  console.log('ReadMe Build is a really, really simple way to create awesome APIs.');
  console.log(`Learn more at ${'https://readme.build'.underline}`.grey);
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
      default: existingPackageJson.name || path.basename(process.cwd()).toLowerCase(),
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
      type: 'input',
      name: 'action',
      message: 'What is the name of your first endpoint?',
      default: 'helloWorld',
    },
    {
      type: 'list',
      name: 'continue',
      message: 'It seems like there are already files here. Do you want to create a new directory?',
      choices: ['yes', 'no', 'abort'],
      when: () => fs.readdirSync(process.cwd()).length,
    },
  ];
};

module.exports.init = (answers) => {
  if (answers.continue === 'abort') {
    exit(0);
  }

  const data = fs.readFileSync(path.join(__dirname, '../utils/stub.js'), 'utf8');
  const stub = data.replace(/<<action>>/g, answers.action);

  let chdirMessage = '';
  if (answers.continue === 'yes') {
    const newPath = `./${answers.name}`;
    fs.mkdirSync(newPath);
    process.chdir(newPath);
    chdirMessage = `${'$'.grey} ${'cd'.yellow} ${answers.name.yellow}`;
  }

  fs.mkdirSync('./endpoints');
  fs.writeFileSync(`./endpoints/${answers.action}.js`, stub);

  // Need to initialise the package.json object down here
  // so that process.cwd() is different in tests
  const pjson = packageJson();
  pjson.set('name', answers.name);
  pjson.set('version', answers.version);
  pjson.write();

  // Only add a readme if one does not exist
  if (!fs.existsSync('readme.md')) {
    fs.writeFileSync('readme.md', `# ${answers.name}\n\nWelcome to ${answers.name}\n`);
  }

  if (process.env.NODE_ENV === 'testing') {
    return undefined;
  }

  const filename = `./endpoints/${answers.action}.js`;

  const name = (utils.getGitConfig('user.name') || 'Julie').split(' ')[0];

  return console.log(`\n${'============================='.grey}

${'Great! We\'ve set up your api!'.green}

1. Try running it locally first:

  ${chdirMessage}

  ${'$'.grey} ${(`api local ${answers.action} name=${name}`).yellow}

2. Edit ${filename.cyan} and build your API!

3. When you're ready to release, run:

  ${'$'.grey} ${('api deploy').yellow}
`);
};
