module.exports.usage = `Deploys a service to build

Usage: api deploy`;

const validName = require('validate-npm-package-name');
const archiver = require('archiver');
const semver = require('semver');
const fs = require('fs');
const request = require('../lib/request');
const buildDocs = require('build-docs');
const path = require('path');
const createEnquirer = require('../lib/enquirer');
const ProgressBar = require('progress');
const utils = require('../utils/utils');

const readmePath = path.join(process.cwd(), 'readme.md');
const zipDir = path.join(__dirname, '../data/output.zip');
const enquirer = createEnquirer();

module.exports.run = async () => {
  const packageJson = require('../lib/package-json')();
  const valid = validName(packageJson.get('name'));
  if (!valid.validForNewPackages) {
    console.log('Invalid Package Name'.red);
    return;
  }

  let deployed = { versions: [] };
  let hasDeployedVersion = false;
  try {
    const service = await request.get(`/services/${packageJson.get('name')}`, { defaultErrorHandler: false });
    deployed = JSON.parse(service);
    hasDeployedVersion = deployed.versions.some(version => version.version === packageJson.get('version'));
  } catch (e) {
    //
  }

  if (hasDeployedVersion) {
    console.log(`\nv${packageJson.get('version')} has already been deployed.`.red);
  }

  let teams = [];
  try {
    const response = await request.get('/teams');
    teams = JSON.parse(response);
  } catch (e) {
    //
  }

  enquirer
    .ask(module.exports.questions(deployed.versions, hasDeployedVersion, teams))
    .then(module.exports.deploy.bind(null, packageJson));
};

function prepareDeploy(packageJson, answers) {
  let team = null;
  if (answers.team && !answers.team.match(/No team/)) {
    team = answers.team;
    packageJson.set('name', `@${answers.team}/${packageJson.get('name')}`);
  }

  if (answers.version) {
    packageJson.set('version', answers.version);
  }

  // Set team to the selected team, or null so that we dont ask again
  packageJson.set('team', team, { build: true });
}

module.exports.prepareDeploy = prepareDeploy;

module.exports.deploy = (packageJson, answers) => {
  prepareDeploy(packageJson, answers);

  const output = fs.createWriteStream(zipDir);
  const archive = archiver('zip', { store: true });

  console.log(`Deploying version: ${packageJson.get('version')}`.green);
  console.log('Converting to travel size...');

  const readme = utils.fileExists(readmePath) ? fs.readFileSync(readmePath, 'utf8') : false;

  if (!readme) {
    console.warn('No readme.md file is present'.yellow);
  }

  // listen for all archive data to be written
  output.on('close', () => {
    console.log('Flying up to the cloud...');

    const req = request.post('/services/', { resolveWithFullResponse: true, sendRequest: false });
    const form = req.form();

    const api = require(path.join(process.cwd(), 'node_modules/api-build/api.js'));
    require(path.join(process.cwd(), packageJson.get('main')));
    const actions = Object.keys(api.actions);

    const main = fs.readFileSync(path.join(process.cwd(), packageJson.get('main')));

    form.append('entrypoint', packageJson.get('main'));
    form.append('version', packageJson.get('version'));
    form.append('name', packageJson.get('name'));
    form.append('docs', JSON.stringify(buildDocs(main, actions)));
    form.append('readme', readme);
    form.append('service', fs.createReadStream(zipDir), {
      filename: `${packageJson.get('name')}.zip`,
      contentType: 'application/zip',
    });

    let progressBar;

    // get upload size
    form.getLength((err, size) => {
      progressBar = new ProgressBar('Uploading [:bar] :percent :etas', {
        total: size,
        complete: '=',
        incomplete: ' ',
        width: 50,
      });
    });

    // calculate uploaded size chunk by chunk
    form.on('data', (data) => {
      progressBar.tick(data.length);
    });

    req.then((res) => {
      console.log('Cleaning up...');
      fs.unlinkSync(zipDir);

      console.log('Persisting changes back to package.json');
      packageJson.write();
      console.log(`\nDeployed to ${res.headers.location}`);
    }).catch(request.errorHandler);
  });

  archive.on('error', (err) => {
    console.error('Error during upload', err);
  });

  archive.pipe(output);

  const handler = path.join(__dirname, '../utils/handler.js');
  archive.append(fs.createReadStream(handler), { name: 'handler.js' });

  archive.glob('**');

  archive.finalize();
};

function constructTeamChoice(name, team) {
  if (team.personal) {
    return `${team.name}: personal team - will be deployed as \`${name}\``;
  }

  return `${team.name}: non-personal team - will be deployed as \`@${team.name}/${name}\``;
}

module.exports.questions = (versions, hasDeployedVersion, teams) => {
  const packageJson = require('../lib/package-json')();
  const questions = [{
    type: 'input',
    name: 'version',
    message: 'What version do you want to deploy?',
    // Ask what version to deploy if this version has already
    // been deployed once
    when: () => hasDeployedVersion,
    validate: (v) => {
      if (!semver.valid(v)) {
        return `${v} is not a valid semver version`;
      }

      if (versions.find(version => version === v)) {
        return `Version ${v} has already been deployed.`;
      }
      return true;
    },
  }];

  // Checking for `build.team` and only asking if unset
  if (!packageJson.has('team', { build: true })) {
    teams.unshift({ name: 'No team (i.e public package)' });
    questions.push({
      type: 'list',
      name: 'team',
      message: 'Which team should this service be deployed to?',
      // TODO bring this back in when I can figure out a way to display something
      // different than the value
      // choices: teams.map(constructTeamChoice.bind(null, packageJson.get('name'))),
      choices: teams.map(t => t.name),
    });
  }

  return questions;
};

module.exports.constructTeamChoice = constructTeamChoice;
