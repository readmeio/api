const archiver = require('archiver');
const fs = require('fs');
const request = require('request-promise');
const path = require('path');
const inquirer = require('inquirer');
const exists = require('../utils/utils').fileExists;
const getKey = require('../utils/utils').getKey;

const pjsonPath = path.join(process.cwd(), 'package.json');
const pjson = exists(pjsonPath) ? require(pjsonPath) : {};

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

      const key = getKey();

      const req = request.post(`http://${key}:@localhost:5000/services/`);
      const form = req.form();
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

    archive.glob('**');

    archive.finalize();
  });
};
