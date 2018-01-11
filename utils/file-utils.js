const fileType = require('file-type');
const Stream = require('stream');
const request = require('request-promise');
const fs = require('fs');
const { URL } = require('url');

exports.file = (p) => {
  if (exports.isUrl(p)) {
    return request.get({ url: p, encoding: null });
  }
  return fs.createReadStream(p);
};

exports.isUrl = (s) => {
  try {
    new URL(s); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
};

// Converts a stream to a buffer
// Useful for locally calling a service
// with a file
exports.streamToBuffer = (s) => {
  return new Promise((resolve, reject) => {
    const out = [];
    s.on('data', (data) => {
      out.push(data);
    });
    s.on('end', () => {
      resolve(Buffer.concat(out));
    });
    s.on('error', reject);
  });
};

// Converts buffers in response to file type
// Only used for api.local
exports.parseLocalFileResponse = (response) => {
  return JSON.parse(response, (k, v) => {
    if (v && v.type === 'Buffer') {
      const type = fileType(Buffer.from(v.data));
      return {
        type: type ? type.ext : 'string',
        file: Buffer.from(v.data),
      };
    }
    return v;
  });
};

// Converts data into the file type if stream or buffer
exports.convertToFileType = async (data) => {
  const out = {};
  for (const d in data) {
    if (data[d] instanceof Stream) {
      /* eslint-disable no-await-in-loop */
      const file = await exports.streamToBuffer(data[d]);
      /* eslint-enable no-await-in-loop */

      out[d] = {
        file: JSON.parse(JSON.stringify(file)),
        type: fileType(file).ext,
      };
    } else if (Buffer.isBuffer(data[d])) {
      out[d] = {
        file: JSON.parse(JSON.stringify(data[d])),
        type: fileType(data[d]).ext,
      };
    } else {
      out[d] = data[d];
    }
  }
  return out;
};
