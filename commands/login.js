const inquirer = require('inquirer');
const request = require('request-promise');
const fs = require('fs');
const os = require('os');
const path = require('path');
const exists = require('../utils/utils').fileExists;
const credPath = path.join(__dirname, '..', 'data/creds.json');
const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address'
  }
];

let creds;

const getEmail = () => {
  creds = exists(credPath) ? require(credPath) : {};
  
  console.log('To start making request, please log in');

  inquirer
    .prompt(questions)
    .then(getToken)
    .catch(console.log);
}

const getToken = (input) => {
  request
    .post('http://localhost:5000/users', {
      json: true,
      body: input
    })
    .then(writeToken)
    .catch(res => {
      console.warn(res.error);
    });
};

const writeToken = (token) => {
  const data = Object.assign({}, creds, { [token.email]: token});
  
  fs.writeFile(credPath, JSON.stringify(data), (err) => {
    if (err) console.error(err);
    console.log('Profile added for user')
  });
}

module.exports.run = getEmail;