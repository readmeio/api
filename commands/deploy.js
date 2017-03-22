module.exports.usage = `Deploys a function to build

Usage: api deploy <version>`;

const archiver = require('archiver');
const semver = require('semver');
const fs = require('fs');
const request = require('request-promise');
const buildDocs = require('build-docs');
const path = require('path');
const inquirer = require('inquirer');
const ProgressBar = require('progress');
const utils = require('../utils/utils');

const pjsonPath = path.join(process.cwd(), 'package.json');
const pjson = utils.fileExists(pjsonPath) ? require(pjsonPath) : {};

const readmePath = path.join(process.cwd(), 'readme.md');

const zipDir = path.join(__dirname, '../data/output.zip');

module.exports.run = async () => {
  let newVersion = pjson.version;
  const jar = utils.getJar();
  const service = await request.get(`${utils.BUILD_URL}/services/${pjson.name}`, { jar });
  const deployed = JSON.parse(service);
  let versionCheck = deployed.versions.filter(version => version.version === newVersion);


  const questions = [
    {
      type: 'input',
      name: 'version',
      message: 'What should the new version be?',
      when: () => versionCheck.length,
      validate: (v) => {
        if (!semver.valid(v)) {
          return `${v} is not a valid semver version`;
        }

        versionCheck = deployed.versions.filter(version => version.version === v);
        if (versionCheck.length >= 1) {
          return `Version ${v} has already been deployed.`;
        }
        return true;
      },
    },
  ];

  if (versionCheck.length) {
    console.log(`\nv${newVersion} has already been deployed.`.red);
  }

  inquirer.prompt(questions).then((response) => {
    if (response.version) {
      newVersion = response.version;
    }

    const output = fs.createWriteStream(zipDir);
    const archive = archiver('zip', {
      store: true,
    });

    console.log('\nConverting to travel size...');

    let readme;
    if (utils.fileExists(readmePath)) {
      readme = fs.readFileSync(readmePath, 'utf8');
    }

    // listen for all archive data to be written
    output.on('close', () => {
      console.log('Flying up to the cloud...');

      const req = request.post(`${utils.BUILD_URL}/services/`, { jar });
      const form = req.form();
      if (pjson.author) {
        form.append('team', pjson.author);
      }

      if (readme) {
        form.append('readme', readme);
      }

      form.append('entrypoint', pjson.main);
      form.append('version', newVersion);
      form.append('name', pjson.name);
      form.append('docs', JSON.stringify(buildDocs(fs.readFileSync(path.join(process.cwd(), pjson.main)))));
      form.append('service', fs.createReadStream(zipDir), {
        filename: `${pjson.name}.zip`,
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

      form.on('end', () => {
        console.log('Building App...');
      });

      req.then((newService) => {
        console.log('Cleaning up...');
        fs.unlinkSync(zipDir);
        pjson.version = newVersion;
        fs.writeFileSync(pjsonPath, JSON.stringify(pjson, undefined, 2));
        const parsedService = JSON.parse(newService);
        console.log(`\nDeployed to http://bips.tech/app/${parsedService.team.name}/${parsedService.name}/overview\n`);
      }).catch((err) => {
        console.log(err.error);
      });
    });

    // good practice to catch this error explicitly
    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    const handler = path.join(__dirname, '../utils/handler.js');
    archive.append(fs.createReadStream(handler), { name: 'handler.js' });

    archive.glob('**');

    archive.finalize();
  });
};
