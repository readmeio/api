const archiver = require('archiver');
const fs = require('fs');
const request = require('request-promise');
const path = require('path');
const inquirer = require('inquirer');
const utils = require('../utils/utils');

const pjsonPath = path.join(process.cwd(), 'package.json');
const pjson = utils.fileExists(pjsonPath) ? require(pjsonPath) : {};

const zipDir = path.join(__dirname, '../data/output.zip');

module.exports.run = () => {
  const questions = [
    {
      type: 'input',
      name: 'version',
      message: 'What should the version number be?',
      default: `${pjson.version}`,
    },
  ];

  inquirer.prompt(questions).then((response) => {
    const output = fs.createWriteStream(zipDir);
    const archive = archiver('zip', {
      store: true,
    });

    console.log('Converting to travel size...');

    // listen for all archive data to be written
    output.on('close', () => {
      console.log('Flying up to the cloud...');

      const jar = utils.getJar();
      const base = utils.BUILD_URL;

      console.log(`Deploying to ${base}`);

      const req = request.post(`${base}/services/`, { jar });
      const form = req.form();
      if (pjson.author) {
        form.append('team', pjson.author);
      }
      form.append('entrypoint', pjson.main);
      form.append('version', response.version);
      form.append('name', pjson.name);
      form.append('service', fs.createReadStream(zipDir), {
        filename: `${pjson.name}.zip`,
        contentType: 'application/zip',
      });

      req.then(() => {
        console.log('Cleaning up...');
        fs.unlinkSync(zipDir);
        console.log('Done!');
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
