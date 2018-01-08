const { execSync } = require('child_process');

if (process.argv.includes('-w') || process.argv.includes('--watch')) {
  console.warn('You\'re watching the tests but not rebuilding the source.');
  console.warn('Run `npm run watch` in a new console');
} else {
  execSync('npm run build');
}
