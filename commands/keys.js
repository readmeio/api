const request = require('request-promise');

const utils = require('../utils/utils');

module.exports.run = () => {
  const jar = utils.getJar();
  request(`${utils.BUILD_URL}/users/me`, { jar }).then((user) => {
    const userParsed = JSON.parse(user);
    for (const team of userParsed.teams) {
      console.log(`${team.name.blue}: ${team.key}`);
    }
  });
};
