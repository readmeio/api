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

  let existingPackageJson;

  try {
    existingPackageJson = require(path.join(process.cwd(), 'package.json'));
    console.log('Existing package.json found, will provide defaults from this');
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
      default: existingPackageJson.version || '1.0.0',
    },
    {
      type: 'input',
      name: 'action',
      message: 'What is the name of your first action?',
      default: 'sayHello',
    },
  ];
};


// If there is already a property set, then add it to the `build` object
function setPackageProperty(packageJson, key, value) {
  if (packageJson[key]) {
    // Ignore property if it's the same
    if (packageJson[key] === value) return;

    if (!packageJson.build) packageJson.build = {};
    packageJson.build[key] = value;
  } else {
    packageJson[key] = value;
  }
}

module.exports.init = (answers) => {
  const data = fs.readFileSync(path.join(__dirname, '../utils/stub.js'), 'utf8');
  const stub = data.replace(/<<action>>/g, answers.action);

  fs.writeFileSync(`${answers.name}.js`, stub);

  let packageJson;

  try {
    packageJson = require(path.join(process.cwd(), 'package.json'));
  } catch (e) {
    packageJson = {};
  }

  setPackageProperty(packageJson, 'name', answers.name);
  setPackageProperty(packageJson, 'version', answers.version);
  setPackageProperty(packageJson, 'main', `${answers.name}.js`);

  fs.writeFileSync('package.json', JSON.stringify(packageJson, undefined, 2));

  // Only add a readme if one does not exist
  if (!fs.existsSync('readme.md')) {
    fs.writeFileSync('readme.md', `# ${answers.name}!\n\nWelcome to ${answers.name}\n`);
  }

  if (process.env.NODE_ENV === 'testing') {
    return undefined;
  }

  console.log(`Running ${'npm install'.yellow}...`);
  return exec('npm install api-build --save', () => {
    const filename = `${answers.name}.js`;
    console.log(`\nGreat! We've created it! Just edit ${filename.yellow} and type ${'api deploy'.yellow} when you are ready!\n`);
  });
};
