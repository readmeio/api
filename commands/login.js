const inquirer = require('inquirer');

module.exports.run = () => {
  const questions = [
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    console.log(`\nWe've sent an email to ${answers.email.green} to complete signup!\n`);
  });
};
