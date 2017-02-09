const inquirer = require('inquirer');
const request = require('request-promise');
const fs = require('fs');
const os = require('os');
const path = require('path');

const basePath = path.join(__dirname, '..');
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
  const data = input

  request
    .post('http://localhost:5000/users', {
      json: true,
      body: data
    })
    .then(res => {
      writeToken(res.token);
      console.log(res);
    })
    .catch(res => {
      console.warn(res.error);
    });
};

const writeToken = (token) => {
  
}

module.exports.run = getEmail;