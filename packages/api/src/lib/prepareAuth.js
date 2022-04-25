/* eslint-disable no-underscore-dangle */
/**
 * @todo Needs work for supporting multiple different kinds of auth at the same time. for example if
 *  an operation uses OAuth and HTTP bearer, how can we guarantee that the OAuth bearer is used with
 *  OAuth?
 *
 * @param {Array} authKeys
 * @param {Operation} operation
 */
module.exports = (authKey, operation) => {
  if (authKey.length === 0) {
    return {};
  }

  const prepared = {};
  const security = operation.prepareSecurity();
  const securitySchemes = Object.keys(security);

  if (securitySchemes.length === 0) {
    // If there's no auth configured on this operation, don't prepare anything (even if it was supplied by the user).
    return {};
  }

  const securityType = securitySchemes[0];
  const schemes = security[securityType];
  if (schemes.length > 1) {
    throw new Error("Sorry, this API currently requires multiple forms of authentication which we don't yet support.");
  }

  const scheme = schemes[0];
  if (scheme.type === 'http') {
    if (scheme.scheme === 'basic') {
      prepared[scheme._key] = {
        user: authKey[0],
        pass: authKey.length === 2 ? authKey[1] : '',
      };
    } else if (scheme.scheme === 'bearer') {
      if (authKey.length > 1) {
        throw new Error(
          'Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.'
        );
      }

      prepared[scheme._key] = authKey[0];
    }
  } else if (scheme.type === 'oauth2') {
    if (authKey.length > 1) {
      throw new Error(
        'Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.'
      );
    }

    prepared[scheme._key] = authKey[0];
  } else if (scheme.type === 'apiKey') {
    if (authKey.length > 1) {
      throw new Error(
        'Multiple auth keys were supplied for the auth on this endpoint, but only a single key is needed.'
      );
    }

    if (scheme.in === 'query' || scheme.in === 'header') {
      prepared[scheme._key] = authKey[0];
    }
  } else {
    throw new Error(`Sorry, this API currently supports a scheme, ${scheme.type}, that we don't yet support.`);
  }

  return prepared;
};
