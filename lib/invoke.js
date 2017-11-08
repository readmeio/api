const request = require('request-promise');
const os = require('os');
const stream = require('stream');
const { BUILD_URL, getSDKVersion, parseResponse } = require('../utils/utils');

module.exports = (key, service, action, data, isCLI) => {
  const headers = {
    'X-Build-Meta-Language': `node@${process.version.replace(/^v/, '')}`,
    'X-Build-Meta-SDK': getSDKVersion(isCLI),
    'X-Build-Meta-OS': `${os.type().toLowerCase()}@${os.release()}`,
  };

  const files = {};
  const filelessData = {};
  for (const param in data) {
    if (data[param] instanceof stream.Readable || Buffer.isBuffer(data[param])) {
      files[param] = data[param];
    } else {
      filelessData[param] = data[param];
    }
  }

  return request.post(`${BUILD_URL}/run/${prefixName(service)}/${action}`, {
    formData: Object.assign({}, files, { data: JSON.stringify(filelessData) }),
    resolveWithFullResponse: true,
    headers,
    auth: { user: key },
  }).then((response) => {
    if (response.headers) checkDeprecated(response);
    return parseResponse(response);
  }).catch((err) => {
    if (err.response && err.response.headers) checkDeprecated(err.response);
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
