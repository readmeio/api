const isInstalledGlobally = require('is-installed-globally');
require('colors');

if (isInstalledGlobally) {
  console.log('Welcome to ReadMe Build!'.green);
  console.log('ReadMe Build makes it incredibly easy to build, deploy and share APIs');
  console.log(`Learn more: ${'https://readme.build'.underline}`.grey);
  console.log('');
  console.log('To get started, run:');
  console.log('');
  console.log(`  ${'$ '.grey} ${'api init'.yellow}`);
  console.log('');
}
