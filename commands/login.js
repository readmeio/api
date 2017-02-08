const inquirer = require('inquirer');
const request = require('request-promise');
const fs = require('fs');
const os = require('os');
const path = require('path');

const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address'
  }
];

const getEmail = () => {
  console.log('To start making request, please log in');

  inquirer
    .prompt(questions)
    .then(getToken)
    .catch(console.log);
}

const getToken = (input) => {
  const data = Object.assign({}, input, {
    machine: machine.machineIdSync()
  });

  request
    .post('http://localhost:5001/cli/login', {
      json: true,
      body: data
    })
    .then(res => {
      writeToken(res.token);
      if (res.message) { console.log(res.message); }
    })
    .catch(res => {
      console.warn(res.error);
    });
};

const writeToken = (token) => {
  
}

module.exports.run = getEmail;