module.exports.usage = `Generate the docs that will be shown on the build website

Usage: api docs

Outputs the docs which display on the website. Generated using https://github.com/readmeio/build-docs`;

const fs = require('fs');
const path = require('path');

const console = require('../utils/console');
const exit = require('../utils/exit');
const buildDocs = require('build-docs');

module.exports.run = () => {
  const pjson = require(path.join(process.cwd(), 'package.json'));
  const main = path.join(process.cwd(), pjson.main);
  const api = require(path.join(process.cwd(), 'node_modules/api/api.js'));
  require(main);
  const docs = buildDocs(fs.readFileSync(main), Object.keys(api.actions));
  console.log('Generated docs for', main.green, '\n');
  console.log(require('util').inspect(docs, { depth: null }));
  return exit(0);
};
