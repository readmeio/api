const stringifyObject = require('stringify-object');
const CodeBuilder = require('httpsnippet/src/helpers/code-builder');
const contentType = require('content-type');
const OAS = require('@readme/oas-tooling');

function buildAuthSnippet(authKey) {
  return `.auth('${authKey.replace("'", "\\'")}')`;
}

function getAuthSources(operation) {
  const matchers = {
    header: [],
    query: [],
    cookie: [],
  };

  if (operation.getSecurity().length === 0) {
    return matchers;
  }

  const security = operation.prepareSecurity();
  Object.keys(security).forEach(id => {
    security[id].forEach(scheme => {
      if (scheme.type === 'http') {
        if (scheme.scheme === 'basic') {
          matchers.header.authorization = 'Basic';
        } else if (scheme.scheme === 'bearer') {
          matchers.header.authorization = 'Bearer';
        }
      } else if (scheme.type === 'oauth2') {
        matchers.header.authorization = 'Bearer';
      } else if (scheme.type === 'apiKey') {
        if (scheme.in === 'query') {
          matchers.query.push(scheme.name);
        } else if (scheme.in === 'header') {
          matchers.header[scheme.name] = '*';
        } else if (scheme.in === 'cookie') {
          matchers.cookie.push(scheme.name);
        }
      }
    });
  });

  return matchers;
}

module.exports = function (source, options) {
  const opts = { indent: '  ', ...options };

  if (!('apiDefinitionUri' in opts)) {
    throw new Error('This HTTP Snippet client must have an `apiDefinitionUri` option supplied to it.');
  } else if (!('apiDefinition' in opts)) {
    throw new Error('This HTTP Snippet client must have an `apiDefinition` option supplied to it.');
  }

  const method = source.method.toLowerCase();
  const oas = new OAS(opts.apiDefinition);
  const operation = oas.getOperation(source.url, method);

  const authData = [];
  const authSources = getAuthSources(operation);

  let includeFS = false;
  const code = new CodeBuilder(opts.indent);

  code.push(`const sdk = require('api')('${opts.apiDefinitionUri}');`).blank();

  let metadata = {};
  if (Object.keys(source.queryObj).length) {
    const queryParams = source.queryObj;

    Object.keys(queryParams).forEach(param => {
      if (authSources.query.includes(param)) {
        authData.push(buildAuthSnippet(queryParams[param]));

        delete queryParams[param];
      }
    });

    metadata = Object.assign(metadata, queryParams);
  }

  if (Object.keys(source.headersObj).length) {
    const headers = source.headersObj;

    Object.keys(headers).forEach(header => {
      if (header in authSources.header) {
        // If this header has been set up as an authentication header, let's remove it and add it into our auth data
        // so we can build up an `.auth()` snippet for the SDK.
        const headerPrefix = authSources.header[header];
        if (headerPrefix === '*') {
          authData.push(buildAuthSnippet(headers[header]));
        } else {
          authData.push(buildAuthSnippet(headers[header].replace(`${authSources.header[header]} `, '')));
        }

        delete headers[header];
      } else if (header === 'content-type') {
        // Content-Type headers are automatically added within the SDK so we can filter them out if they don't have
        // parameters attached to them.
        const parsedContentType = contentType.parse(headers[header]);
        if (!Object.keys(parsedContentType.parameters).length) {
          delete headers[header];
        }
      } else if (header === 'accept') {
        // If the accept header here is not the default/first accept header for the operations request body, then we
        // should add it, otherwise just let the SDK handle it itself.
        if (headers[header] === operation.getContentType()) {
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

  let authCode = [];
  if (authData.length) {
    authCode = authData;
  }

  const args = [];

  let accessor = method;
  if ('operationId' in operation && operation.operationId.length > 0) {
    accessor = operation.operationId;
  } else {
    // For cases where a server URL in the OAS has a path attached to it, we don't want to include that path with the
    // operation path.
    const path = source.url.replace(oas.url(), '');
    args.push(`'${path}'`);
  }

  if (typeof body !== 'undefined') {
    args.push(stringifyObject(body, { indent: '  ', inlineCharacterLimit: 80 }));
  }

  if (Object.keys(metadata).length > 0) {
    args.push(stringifyObject(metadata, { indent: '  ', inlineCharacterLimit: 80 }));
  }

  if (includeFS) {
    code.unshift('const fs = require("fs");');
  }

  code.push(`sdk${authCode.join()}.${accessor}(${args.join(', ')})`);
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
