const archiver = require('archiver');
const fs = require('fs');
const request = require('request-promise');
const path = require('path');
const inquirer = require('inquirer');

const pjson = require(path.join(process.cwd(), 'package.json'));
const cred = require('../data/creds.json');

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

      const req = request.post('http://localhost:5000/services/');
      const form = req.form();
      form.append('entryPoint', pjson.main);
      form.append('version', response.version);
      form.append('name', pjson.name);
      form.append('key', cred['mjcuva@gmail.com'].key);
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

    archive.glob('**');

    archive.finalize();
  });
};
