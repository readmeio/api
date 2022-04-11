/* eslint-disable no-underscore-dangle */
import type { Operation } from 'oas';

type SecurityType = 'Basic' | 'Bearer' | 'Query' | 'Header' | 'Cookie' | 'OAuth2' | 'http' | 'apiKey';

export default function prepareAuth(authKey: (number | string)[], operation: Operation) {
  if (authKey.length === 0) {
    return {};
  }

  const preparedAuth: Record<
    string,
    | string
    | number
    | {
        user: string | number;
        pass: string | number;
      }
  > = {};

  const security = operation.prepareSecurity();

  const securitySchemes = Object.keys(security);
  if (securitySchemes.length === 0) {
    // If there's no auth configured on this operation, don't prepare anything (even if it was
    // supplied by the user).
    return {};
  }

  const securityType = securitySchemes[0] as SecurityType;

  const schemes = security[securityType];

  if (schemes.length > 1) {
    throw new Error("Sorry, this API currently requires multiple forms of authentication which we don't yet support.");
  }

  const scheme = schemes[0];

  switch (scheme.type) {
    case 'http':
      if (scheme.scheme === 'basic') {
        preparedAuth[scheme._key] = {
          user: authKey[0],
          pass: authKey.length === 2 ? authKey[1] : '',
        };
      } else if (scheme.scheme === 'bearer') {
        if (authKey.length > 1) {
          throw new Error(
            'Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.'
          );
        }

        preparedAuth[scheme._key] = authKey[0];
      }
      break;

    case 'oauth2':
      if (authKey.length > 1) {
        throw new Error(
          'Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.'
        );
      }

      preparedAuth[scheme._key] = authKey[0];
      break;

    case 'apiKey':
      if (authKey.length > 1) {
        throw new Error(
          'Multiple auth keys were supplied for the auth on this endpoint, but only a single key is needed.'
        );
      }

      if (scheme.in === 'query' || scheme.in === 'header' || scheme.in === 'cookie') {
        preparedAuth[scheme._key] = authKey[0];
      }
      break;

    default:
      throw new Error(`Sorry, this API currently supports a scheme, ${scheme.type}, that we don't yet support.`);
  }

  return preparedAuth;
}
