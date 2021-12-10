const { match } = require('path-to-regexp');
const stringifyObject = require('stringify-object');
const CodeBuilder = require('@readme/httpsnippet/src/helpers/code-builder');
const contentType = require('content-type');
const Oas = require('oas').default;

function stringify(obj, opts = {}) {
  return stringifyObject(obj, { indent: '  ', ...opts });
}

function buildAuthSnippet(authKey) {
  // Auth key will be an array for Basic auth cases.
  if (Array.isArray(authKey)) {
    const auth = [];
    authKey.forEach((token, i) => {
      // If the token part is the last part of the key and it's empty, don't add it to the snippet.
      if (token.length === 0 && authKey.length > 1 && i === authKey.length - 1) {
        return;
      }

      auth.push(`'${token.replace(/'/g, "\\'")}'`);
    });

    return `sdk.auth(${auth.join(', ')})`;
  }

  return `sdk.auth('${authKey.replace(/'/g, "\\'")}');`;
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

function getParamsInPath(operation, path) {
  const cleanedPath = operation.path.replace(/{(.*?)}/g, ':$1');
  const matchStatement = match(cleanedPath, { decode: decodeURIComponent });
  const matchResult = matchStatement(path);
  const slugs = {};

  if (matchResult && Object.keys(matchResult.params).length) {
    Object.keys(matchResult.params).forEach(param => {
      slugs[`${param}`] = matchResult.params[param];
    });
  }

  return slugs;
}

module.exports = function (source, options) {
  const opts = { indent: '  ', ...options };

  if (!('apiDefinitionUri' in opts)) {
    throw new Error('This HTTP Snippet client must have an `apiDefinitionUri` option supplied to it.');
  } else if (!('apiDefinition' in opts)) {
    throw new Error('This HTTP Snippet client must have an `apiDefinition` option supplied to it.');
  }

  const method = source.method.toLowerCase();
  const oas = new Oas(opts.apiDefinition);
  const apiDefinition = oas.getDefinition();
  const foundOperation = oas.findOperation(source.url, method);
  if (!foundOperation) {
    throw new Error(
      `Unable to locate a matching operation in the supplied \`apiDefinition\` for: ${source.method} ${source.url}`
    );
  }

  const operationSlugs = foundOperation.url.slugs;
  const operation = oas.operation(foundOperation.url.nonNormalizedPath, method);
  const path = operation.path;
  const authData = [];
  const authSources = getAuthSources(operation);

  const code = new CodeBuilder(opts.indent);

  code.push(`const sdk = require('api')('${opts.apiDefinitionUri}');`);
  code.blank();

  // If we have multiple servers configured and our source URL differs from the stock URL that we receive from our
  // `oas` library then the URL either has server variables contained in it (that don't match the defaults), or the
  // OAS offers alternate server URLs and we should expose that in the generated snippet.
  const configData = [];
  if ((apiDefinition.servers || []).length > 1) {
    const stockUrl = oas.url();
    const baseUrl = source.url.replace(path, '');
    if (baseUrl !== stockUrl) {
      const serverVars = oas.splitVariables(baseUrl);
      const serverUrl = serverVars ? oas.url(serverVars.selected, serverVars.variables) : baseUrl;

      configData.push(`sdk.server('${serverUrl}');`);
    }
  }

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

  // If we have path parameters present, we should only add them in if we have an operationId as we don't want metadata
  // to duplicate what we'll be setting the path in the snippet to.
  if ('operationId' in operation.schema) {
    const pathParams = getParamsInPath(operation, operation.path);
    if (Object.keys(pathParams).length) {
      Object.keys(pathParams).forEach(param => {
        if (`:${param}` in operationSlugs) {
          metadata[param] = operationSlugs[`:${param}`];
        } else {
          metadata[param] = pathParams[param];
        }
      });
    }
  }

  if (Object.keys(source.headersObj).length) {
    const headers = source.headersObj;

    Object.keys(headers).forEach(header => {
      // Headers in HTTPSnippet are case-insensitive so we need to add in some special handling to make sure we're able
      // to match them properly.
      const headerLc = header.toLowerCase();

      if (headerLc in authSources.header) {
        // If this header has been set up as an authentication header, let's remove it and add it into our auth data
        // so we can build up an `.auth()` snippet for the SDK.
        const authScheme = authSources.header[headerLc];
        if (authScheme === '*') {
          authData.push(buildAuthSnippet(headers[header]));
        } else {
          let authKey = headers[header].replace(`${authSources.header[headerLc]} `, '');
          if (authScheme.toLowerCase() === 'basic') {
            authKey = Buffer.from(authKey, 'base64').toString('ascii');
            authKey = authKey.split(':');
          }

          authData.push(buildAuthSnippet(authKey));
        }

        delete headers[header];
      } else if (headerLc === 'content-type') {
        // Content-Type headers are automatically added within the SDK so we can filter them out if they don't have
        // parameters attached to them.
        const parsedContentType = contentType.parse(headers[header]);
        if (!Object.keys(parsedContentType.parameters).length) {
          delete headers[header];
        }
      } else if (headerLc === 'accept') {
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
      if (source.postData.params) {
        body = {};

        // If there's a `Content-Type` header present in the metadata, but it's for the form-data
        // request then dump it off the snippet. We shouldn't offload that unnecessary bloat to the
        // user, instead letting the SDK handle it automatically.
        if ('content-type' in metadata && metadata['content-type'].indexOf('multipart/form-data') === 0) {
          delete metadata['content-type'];
        }

        source.postData.params.forEach(function (param) {
          if (param.fileName) {
            body[param.name] = param.fileName;
          } else {
            body[param.name] = param.value;
          }
        });
      }
      break;

    default:
      if (source.postData.text) {
        body = source.postData.text;
      }
  }

  const args = [];

  let accessor = method;
  if ('operationId' in operation.schema && operation.schema.operationId.length > 0) {
    accessor = operation.schema.operationId;
  } else {
    // Since we're not using an operationId as our primary accessor we need to take the current operation that we're
    // working with and transpile back our path parameters on top of it.
    const slugs = Object.fromEntries(
      Object.keys(operationSlugs).map(slug => [slug.replace(/:(.*)/, '$1'), operationSlugs[slug]])
    );

    args.push(`'${decodeURIComponent(oas.replaceUrl(path, slugs))}'`);
  }

  // If the operation or method accessor is non-alphanumeric, we need to add it to the SDK object as an array key.
  // https://github.com/readmeio/api/issues/119
  if (accessor.match(/[^a-zA-Z\d\s:]/)) {
    accessor = `['${accessor}']`;
  } else {
    accessor = `.${accessor}`;
  }

  // If we're going to be rendering out body params and metadata we should cut their character limit in half because
  // we'll be rendering them in their own lines.
  const inlineCharacterLimit = typeof body !== 'undefined' && Object.keys(metadata).length > 0 ? 40 : 80;
  if (typeof body !== 'undefined') {
    args.push(stringify(body, { inlineCharacterLimit }));
  }

  if (Object.keys(metadata).length > 0) {
    args.push(stringify(metadata, { inlineCharacterLimit }));
  }

  if (authData.length) {
    code.push(authData.join('\n'));
  }

  if (configData.length) {
    code.push(configData.join('\n'));
  }

  code
    .push(`sdk${accessor}(${args.join(', ')})`)
    .push(1, '.then(res => console.log(res))')
    .push(1, '.catch(err => console.error(err));');

  return code.join();
};

module.exports.info = {
  key: 'api',
  title: 'API',
  link: 'https://npm.im/api',
  description: 'Automatic SDK generation from an OpenAPI definition.',
};
