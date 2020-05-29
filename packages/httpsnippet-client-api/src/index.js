const stringifyObject = require('stringify-object');
const CodeBuilder = require('httpsnippet/src/helpers/code-builder');
const contentType = require('content-type');

module.exports = function (source, options) {
  const opts = { indent: '  ', ...options };

  let includeFS = false;
  const code = new CodeBuilder(opts.indent);

  code.push(`const sdk = require('api')('${opts.apiDefinitionPath}');`).blank();

  let metadata = {};
  if (Object.keys(source.queryObj).length) {
    metadata = Object.assign(metadata, source.queryObj);
  }

  if (Object.keys(source.headersObj).length) {
    const headers = source.headersObj;
    Object.keys(headers).forEach(header => {
      if (header === 'content-type') {
        const parsedContentType = contentType.parse(headers[header]);
        if (!Object.keys(parsedContentType.parameters).length) {
          delete headers[header];
        }
      }
    });

    if (Object.keys(headers).length > 0) {
      metadata = Object.assign(metadata, headers);
    }
  }

  let body;
  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      body = source.postData.paramsObj;
      break;

    case 'application/json':
      if (source.postData.jsonObj) {
        body = source.postData.jsonObj;
      }
      break;

    case 'multipart/form-data':
      body = {};

      source.postData.params.forEach(function (param) {
        const attachment = {};

        if (!param.fileName && !param.contentType) {
          body[param.name] = param.value;
          return;
        }

        if (param.fileName && !param.value) {
          includeFS = true;
          attachment.value = `fs.createReadStream("${param.fileName}")`;
        } else if (param.value) {
          attachment.value = param.value;
        }

        if (param.fileName) {
          attachment.options = {
            filename: param.fileName,
            contentType: param.contentType ? param.contentType : null,
          };
        }

        body[param.name] = attachment;
      });
      break;

    default:
      if (source.postData.text) {
        body = source.postData.text;
      }
  }

  const accessors = [`'${source.uriObj.pathname}'`];
  if (typeof body !== 'undefined') {
    accessors.push(stringifyObject(body, { indent: '  ', inlineCharacterLimit: 80 }));
  }

  if (Object.keys(metadata).length > 0) {
    accessors.push(stringifyObject(metadata, { indent: '  ', inlineCharacterLimit: 80 }));
  }

  if (includeFS) {
    code.unshift('const fs = require("fs");');
  }

  code.push(`sdk.${source.method.toLowerCase()}(${accessors.join(', ')})`);
  code.push(1, '.then(res => res.json())');
  code.push(1, '.then(res => {');
  code.push(2, 'console.log(res);');
  code.push(1, '});');

  return code.join();
};

module.exports.info = {
  key: 'api',
  title: 'API',
  link: 'https://npm.im/api',
  description: 'Automatic SDK generation from an OpenAPI definition.',
};
