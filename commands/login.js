module.exports.usage = `Login to Build

Usage: api login`;

const createEnquirer = require('../lib/enquirer');
const request = require('request-promise');
const fs = require('fs');
const utils = require('../utils/utils');

const execSync = require('child_process').execSync;

const proxyUrl = utils.BUILD_URL;
const enquirer = createEnquirer();

module.exports.aliases = ['signup'];

let action;

const getEmail = (args) => {
  action = args[0];
  if (utils.fileExists(utils.credPath)) {
    console.log(`You are already logged in. Run ${'api logout'.green} switch accounts.`);
  } else {
    let email;
    try {
      email = execSync('git config --global user.email').toString().trim();
    } catch (e) {
      // hi
    }

    enquirer
      .ask({
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
        default: email,
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
      if (action !== 'signup') console.log('It seems like you need to sign up!');
      enquirer
        .ask([
          {
            type: 'input',
            name: 'username',
            message: 'Enter a username',
          },
          {
            type: 'input',
            name: 'inviteCode',
            message: 'Enter your invite code',
          },
        ]).then((u) => {
          getPassword().then(p => signup(input.email, u.username, p.password, p.inviteCode));
        }).catch(console.log);
    } else if (res === 'login' && action !== 'signup') {
      getPassword().then(p => login(input.email, p.password)).catch(console.log);
    } else {
      console.log(`An account already exists with that email. Run ${'api login'.green} to log in!`);
    }
  });
};

const getPassword = () => {
  return enquirer
    .ask({
      type: 'password',
      name: 'password',
      message: 'Enter your password',
    });
};

const signup = (email, username, password, inviteCode) => {
  request.post(`${proxyUrl}/users`, {
    json: true,
    body: {
      email,
      username,
      password,
      inviteCode,
    },
  }).then(() => login(email, password)).catch(res => console.log(res.error.error.red));
};

const j = request.jar();
function saveCookie() {
  fs.writeFile(utils.credPath, JSON.stringify(j._jar), (err) => {
    if (err) console.log(err);
    if (action === 'signup') {
      console.log('Account Created!');
    } else {
      console.log('Successfully Logged In!'.green);
    }
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
    console.log(res.error.error.red);
  });
};

module.exports.run = getEmail;
