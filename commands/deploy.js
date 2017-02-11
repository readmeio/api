const archiver = require('archiver');
const fs = require('fs');
const request = require('request-promise');
const path = require('path');

const pjson = require(path.join(process.cwd(), 'package.json'));

module.exports.run = () => {
  const output = fs.createWriteStream(__dirname + '/output.zip');
  const archive = archiver('zip', {
    store: true,
  });

  console.log('Converting to travel size...');

  // listen for all archive data to be written
  output.on('close', () => {

    console.log('Flying up to the cloud...')

    const req = request.post('http://localhost:5000/services/');
    const form = req.form();
    form.append('entryPoint', pjson.main);
    form.append('version', pjson.version);
    form.append('name', pjson.name);
    form.append('service', fs.createReadStream(__dirname + '/output.zip'), {
      filename: `${pjson.name}.zip`,
      contentType: 'application/zip',
    });

    req.then((body) => {
      console.log('Cleaning up...');
      fs.unlinkSync(__dirname + '/output.zip');
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
};
