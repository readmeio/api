import fs from 'node:fs';
import path from 'node:path';

const readme = fs.readFileSync('README.md', 'utf-8');

// All Markdown files are located within the `docs` directory.
const files = fs
  .readdirSync('docs', { withFileTypes: true })
  .filter(fileHandle => fileHandle.isFile())
  .map(fileHandle => path.join('docs', fileHandle.name))
  .filter(file => file.endsWith('.md') || file.endsWith('.markdown'));

// Clears out and recreates `dist` folder.
fs.rmSync('dist', { force: true, recursive: true });
fs.mkdirSync('dist/docs', { recursive: true });

files.forEach(fileName => {
  let output = fs.readFileSync(fileName, 'utf-8');

  if (output.includes('{{README}}')) {
    output = output.replace('{{README}}', readme);
  }

  fs.writeFileSync(`dist/${fileName}`, output, 'utf-8');
});
