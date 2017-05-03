module.exports.usage = `Deploys a function to build

Usage: api deploy <version>`;

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

const packageJson = require('../lib/package-json')();

const readmePath = path.join(process.cwd(), 'readme.md');
const zipDir = path.join(__dirname, '../data/output.zip');
const enquirer = createEnquirer();

module.exports.run = async () => {
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
    hasDeployedVersion = deployed.versions.some(version => version === packageJson.get('version'));
  } catch (e) {
    //
  }

  if (hasDeployedVersion) {
    console.log(`\nv${packageJson.get('version')} has already been deployed.`.red);
  }

  enquirer
    .ask(module.exports.questions(deployed.versions, hasDeployedVersion))
    .then(module.exports.deploy);
};

module.exports.deploy = (answers) => {
  const version = answers.version || packageJson.get('version');

  const output = fs.createWriteStream(zipDir);
  const archive = archiver('zip', { store: true });

  console.log(`Deploying version: ${version}`.green);
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
    if (pjson.author) {
      form.append('team', pjson.author);
    }

    const api = require(path.join(process.cwd(), 'node_modules/api-build/api.js'));
    require(path.join(process.cwd(), packageJson.get('main')));
    const actions = Object.keys(api.actions);

    const main = fs.readFileSync(path.join(process.cwd(), packageJson.get('main')));

    form.append('entrypoint', packageJson.get('main'));
    // form.append('private', `${pjson.private}`);
    form.append('version', version);
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
      packageJson.set('version', version);
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

module.exports.questions = (versions, hasDeployedVersion) => {
  return [
    {
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
    },
  ];
};
