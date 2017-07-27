const request = require('request-promise');
const os = require('os');
const { BUILD_URL, getPackageJson } = require('../utils/utils');

module.exports = (key, service, action, data, isCLI) => {
  const headers = {
    'X-Build-Meta-Language': `node@${process.version.replace(/^v/, '')}`,
    'X-Build-Meta-SDK': `${isCLI ? 'api-cli' : 'api'}@${getPackageJson().version || ''}`,
    'X-Build-Meta-OS': `${os.type().toLowerCase()}@${os.release()}`,
  };

  return request.post(`${BUILD_URL}/run/${prefixName(service)}/${action}`, {
    json: data,
    resolveWithFullResponse: true,
    headers,
    auth: { user: key },
  }).then((response) => {
    if (response.headers) checkDeprecated(response);
    return response;
  }).catch((err) => {
    if (err.response.headers) checkDeprecated(err.response);
    return Promise.reject(err);
  });
};

module.exports.prefixName = prefixName;
function prefixName(name) {
  if (name.indexOf('/') > -1 && !name.startsWith('@')) {
    return `@${name}`;
  }

  return name;
}

function checkDeprecated(response) {
  const service = response.headers['x-build-service'];
  const version = response.headers['x-build-version'];
  if (response.headers['x-build-deprecated']) {
    console.log(`${service} v${version} is deprecated! Run \`api update ${service}\` to use the latest version`.red);
  }
}
