/* eslint-disable no-underscore-dangle */
import type { Operation } from 'oas';

type SecurityType = 'Basic' | 'Bearer' | 'Query' | 'Header' | 'Cookie' | 'OAuth2' | 'http' | 'apiKey';

/**
 * @param {Array} authKeys
 * @param {Operation} operation
 */
export default function prepareAuth(authKeys: Array<string[]>, operation: Operation) {
  if (authKeys.length === 0) {
    return {};
  }

  const prepared: Record<string, string | { user: string; pass: string }> = {};
  const security = operation.prepareSecurity();

  const securitySchemes = Object.keys(security);
  if (securitySchemes.length === 0) {
    // If there's no auth configured on this operation, don't prepare anything (even if it was
    // supplied by the user).
    return {};
  }

  authKeys.forEach((authKey, idx) => {
    const securityType = securitySchemes[idx] as SecurityType;
    const schemes = security[securityType];
    if (schemes.length > 1) {
      throw new Error(
        "Sorry, this API currently requires multiple forms of authentication which we don't yet support."
      );
    }

    const scheme = schemes[0];
    switch (scheme.type) {
      case 'http':
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
        break;

      case 'oauth2':
        if (authKey.length > 1) {
          throw new Error(
            'Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.'
          );
        }

        prepared[scheme._key] = authKey[0];
        break;

      case 'apiKey':
        if (authKey.length > 1) {
          throw new Error(
            'Multiple auth keys were supplied for the auth on this endpoint, but only a single key is needed.'
          );
        }

        if (scheme.in === 'query' || scheme.in === 'header') {
          prepared[scheme._key] = authKey[0];
        }
        break;

      default:
        throw new Error(`Sorry, this API currently supports a scheme, ${scheme.type}, that we don't yet support.`);
    }
  });

  return prepared;
}
