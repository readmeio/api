// eslint-disable-next-line import/no-extraneous-dependencies
const { transcludeFile } = require('hercule/promises');
const fs = require('fs');
const path = require('path');

/**
 * all Markdown files located at within the `docs` directory
 * @type {Array.<String>}
 */
const files = fs
  .readdirSync('docs', { withFileTypes: true })
  .filter(fileHandle => fileHandle.isFile())
  .map(fileHandle => path.join('docs', fileHandle.name))
  .filter(file => file.endsWith('.md') || file.endsWith('.markdown'));

// Clears out and recreates `dist` folder
fs.rmSync('dist', { force: true, recursive: true });
fs.mkdirSync('dist/docs', { recursive: true });

// Populates any partials using hercule and then
// writes output to `dist` folder
files.forEach(fileName => {
  transcludeFile(fileName).then(({ output }) => {
    fs.writeFileSync(`dist/${fileName}`, output, 'utf-8');
  });
});
