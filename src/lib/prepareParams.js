function digestParameters(parameters) {
  return parameters.reduce((prev, param) => {
    if ('$ref' in param || 'allOf' in param || 'anyOf' in param || 'oneOf' in param) {
      throw new Error(`The OpenAPI document for this operation wasn't dereferenced before processing.`);
    } else if (param.name in prev) {
      throw new Error(
        `The operation you are using has the same parameter, ${param.name}, spread across multiple entry points. We unfortunately can't handle this right now.`
      );
    }

    return Object.assign(prev, { [param.name]: param });
  }, {});
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
function isEmpty(obj) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
}

module.exports = function (operation, body, metadata) {
  // If no data was supplied, just return immediately.
  if (isEmpty(body) && isEmpty(metadata)) {
    return {};
  }

  const params = {};
  let shouldDigestParams = false;
  const contentType = operation.getContentType();

  if (Array.isArray(body)) {
    // If the body param is an array, then it's absolutely a body and not something we need to do analysis against.
    params.body = body;

    if (typeof metadata !== 'undefined') {
      shouldDigestParams = true;
    }
  } else if (typeof metadata === 'undefined') {
    // No metadata was explicitly defined so we need to analyze the body to determine if it should actually be treated
    // as metadata.
    shouldDigestParams = true;
  } else {
    // Body and metadata were both supplied.
    params.body = body;
    shouldDigestParams = true;
  }

  let digested = {};
  let hasDigestedParams = false;
  if (shouldDigestParams) {
    // @todo `operation.parameters` should also pull in common params (this does not happen automatically when dereffing!)
    if ('parameters' in operation) {
      digested = digestParameters(operation.parameters);
      hasDigestedParams = Object.keys(digested).length;
    }
  }

  // No metadata was explicitly defined so we need to analyze the supplied, and we haven't already set a body then we
  // need to analyze the supplied body to see if it should actually be metadata. If not, then we can just treat it as a
  // body and pass it along.
  if (!('body' in params) && typeof metadata === 'undefined') {
    if (!hasDigestedParams) {
      // No parameters were able to be digested, so we just have to assume that what the user supplied was for a body.
      // This might lead to unwanted false positives if an OAS isn't accurate, but short of throwing an error there
      // isn't anything we can really do about it.
      params.body = body;
    } else {
      const intersection = Object.keys(body).filter(value => Object.keys(digested).includes(value)).length;
      if (intersection && intersection / Object.keys(body).length > 0.25) {
        // If more than 25% of the body intersects with the parameters that we've got on hand, then we should treat it
        // as a metadata object and organize into parameters.
        // eslint-disable-next-line no-param-reassign
        metadata = body;
      } else {
        // For all other cases, we should just treat the supplied body as a body.
        params.body = body;
      }
    }
  }

  // @todo add in a debug mode that would run jsonschema validation against request bodies and parameters and throw back errors if what's supplied isn't up to spec.

  // Only spend time trying to organize metadata into parameters if we were able to digest parameters out of the
  // operation schema. If we couldn't digest anything, but metadata was supplied then we wouldn't know where to place
  // the metadata!
  if (hasDigestedParams) {
    params.header = {};
    params.path = {};
    params.query = {};

    if (typeof metadata === 'object' && !isEmpty(metadata)) {
      const metadataKeys = Object.keys(metadata);
      if (metadataKeys.length) {
        metadataKeys.forEach(param => {
          if (!(param in digested)) {
            // This param isn't documented in the OAS, so we can't know where to put it!
            return;
          }

          if (digested[param].in === 'path') {
            params.path[param] = metadata[param];
          } else if (digested[param].in === 'query') {
            params.query[param] = metadata[param];
          } else if (digested[param].in === 'header') {
            params.header[param] = metadata[param];
          } else if (digested[param].in === 'cookie') {
            // @todo add support cookie params here and also in @readme/oas-to-har
          }
        });
      }
    }
  }

  // Form data should be placed inside `formData` instead of `body` for it to properly get picked up.
  if (contentType === 'application/x-www-form-urlencoded') {
    params.formData = body;
    delete params.body;
  }

  // @todo add required params with defaults if they aren't supplied
  // @todo in debug mode, if a path param is missing (and required -- they always are), and no defaults are present, we should throw an error

  // Clean up any empty items.
  ['body', 'formData', 'header', 'path', 'query'].forEach(type => {
    if (type in params && Object.keys(params[type]).length === 0) {
      delete params[type];
    }
  });

  return params;
};
