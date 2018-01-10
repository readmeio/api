const request = require('request-promise');
const os = require('os');
const querystring = require('querystring');

const { BUILD_URL, getSDKVersion } = require('../utils/utils');

module.exports = (key, service, action, data, isCLI) => {
  const headers = {
    'X-Build-Meta-Language': `node@${process.version.replace(/^v/, '')}`,
    'X-Build-Meta-SDK': getSDKVersion(isCLI),
    'X-Build-Meta-OS': `${os.type().toLowerCase()}@${os.release()}`,
  };

  if (data['x-build-outputs'] !== undefined) {
    const parsedOutput = querystring.stringify(data['x-build-outputs']);
    delete data['x-build-outputs'];
    headers['X-Build-Output'] = parsedOutput;
  }

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
