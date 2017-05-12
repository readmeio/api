const createEnquirer = require('../lib/enquirer');
const request = require('request-promise');
const fs = require('fs');
const exists = require('../utils/utils').fileExists;
const utils = require('../utils/utils');

const proxyUrl = utils.BUILD_URL;
const enquirer = createEnquirer();

const getEmail = () => {
  if (exists(utils.credPath)) {
    console.log('You are already logged in. Please log out to switch accounts.');
  } else {
    enquirer
      .ask({
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
      })
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
      enquirer
        .ask({
          type: 'password',
          name: 'password',
          message: 'Enter your password',
        })
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
