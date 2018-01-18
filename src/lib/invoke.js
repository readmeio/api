const request = require('request-promise');
const os = require('os');
const querystring = require('querystring');

const { BUILD_URL, getSDKVersion, parseResponse, parseData } = require('../utils/utils');

module.exports = (key, service, action, data, opts = {}) => {
  const outputs = opts.outputs;

  const headers = {
    'X-Build-Meta-Language': `node@${process.version.replace(/^v/, '')}`,
    'X-Build-Meta-SDK': getSDKVersion(opts.isCLI),
    'X-Build-Meta-OS': `${os.type().toLowerCase()}@${os.release()}`,
  };

  if (outputs !== undefined) {
    const parsedOutput = querystring.stringify(outputs);
    headers['X-Build-Output'] = parsedOutput;
  }

  return request.post(`${BUILD_URL}/run/${prefixName(service)}/${action}`, {
    formData: parseData(data),
    resolveWithFullResponse: true,
    headers,
    auth: { user: key },
  }).then((response) => {
    if (response.headers) checkDeprecated(response);
    return parseResponse(response);
  }).catch((err) => {
    if (err.response && err.response.headers) checkDeprecated(err.response);
    return Promise.reject(err.error);
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
