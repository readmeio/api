const inquirer = require('inquirer');
const request = require('request-promise');
const fs = require('fs');
const exists = require('../utils/utils').fileExists;
const utils = require('../utils/utils');

const proxyUrl = utils.BUILD_URL;

module.exports.aliases = ['signup'];

const emailQ = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address',
  },
];

const passwordQ = [
  {
    type: 'password',
    name: 'password',
    message: 'Enter your password',
  },
];

const getEmail = () => {
  if (exists(utils.credPath)) {
    console.log('You are already logged in. Please log out to switch accounts.');
  } else {
    inquirer
      .prompt(emailQ)
      .then(getToken)
      .catch(console.log);
  }
};

const getToken = (input) => {
  request.post(`${proxyUrl}/users/action`, {
    json: true,
    body: input,
  }).then((res) => {
    if (res === 'signup') {
      console.log('Hmm, it seems like you need to sign up!');
      const signupUrl = `${utils.WWW_URL}/signup`.blue;
      console.log(`Visit ${signupUrl} to create an account`);
    } else if (res === 'login') {
      inquirer
        .prompt(passwordQ)
        .then(p => login(input.email, p.password)).catch(console.log);
    } else if (res === 'incomplete') {
      console.log('This user hasn\'t been completely set up yet! Check your email to proceed.');
    }
  });
};

const j = request.jar();
function saveCookie() {
  fs.writeFile(utils.credPath, JSON.stringify(j._jar), (err) => {
    if (err) console.log(err);
    console.log('Logged In!');
  });
}

const login = (email, password) => {
  request.post(`${proxyUrl}/login/cli`, {
    json: true,
    jar: j,
    body: {
      usermail: email,
      password,
    },
  }).then(saveCookie).catch((res) => {
    console.log(res.error.error);
  });
};

module.exports.run = getEmail;
