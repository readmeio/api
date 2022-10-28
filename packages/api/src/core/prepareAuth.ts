/* eslint-disable no-underscore-dangle */
import type { Operation } from 'oas';

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

  const security = operation.getSecurity();
  if (security.length === 0) {
    // If there's no auth configured on this operation, don't prepare anything (even if it was
    // supplied by the user).
    return {};
  }

  // Does this operation require multiple forms of auth?
  if (security.every(s => Object.keys(s).length > 1)) {
    throw new Error(
      "Sorry, this operation currently requires multiple forms of authentication which this library doesn't yet support."
    );
  }

  // Since we can only handle single auth security configurations, let's pull those out. This code
  // is a bit opaque but `security` here may look like `[{ basic: [] }, { oauth2: [], basic: []}]`
  // and are filtering it down to only single-auth requirements of `[{ basic: [] }]`.
  const usableSecurity = security
    .map(s => {
      return Object.keys(s).length === 1 ? s : false;
    })
    .filter(Boolean);

  const usableSecuritySchemes = usableSecurity.map(s => Object.keys(s)).reduce((prev, next) => prev.concat(next), []);
  const preparedSecurity = operation.prepareSecurity();

  // If we have two auth tokens present let's look for Basic Auth in their configuration.
  if (authKey.length >= 2) {
    // If this operation doesn't support HTTP Basic auth but we have two tokens, that's a paddlin.
    if (!('Basic' in preparedSecurity)) {
      throw new Error('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
    }

    // If we have two auth keys for Basic Auth but Basic isn't a usable security scheme (maybe it's
    // part of an AND or auth configuration -- which we don't support) then we need to error out.
    const schemes = preparedSecurity.Basic.filter(s => usableSecuritySchemes.includes(s._key));
    if (!schemes.length) {
      throw new Error(
        'Credentials for Basic Authentication were supplied but this operation requires another form of auth in that case, which this library does not yet support. This operation does, however, allow supplying a single auth token.'
      );
    }

    const scheme = schemes.shift();
    preparedAuth[scheme._key] = {
      user: authKey[0],
      pass: authKey.length === 2 ? authKey[1] : '',
    };

    return preparedAuth;
  }

  // If we know we don't need to use HTTP Basic auth because we have a username+password then we
  // can pick the first usable security scheme available and try to use that. This might not always
  // be the auth scheme that the user wants, but we don't have any other way for the user to tell
  // us what they want with the current `sdk.auth()` API.
  const usableScheme = usableSecuritySchemes[0];
  const schemes = Object.entries(preparedSecurity)
    .map(([, ps]) => ps.filter(s => usableScheme === s._key))
    .reduce((prev, next) => prev.concat(next), []);

  const scheme = schemes.shift();
  switch (scheme.type) {
    case 'http':
      if (scheme.scheme === 'basic') {
        preparedAuth[scheme._key] = {
          user: authKey[0],
          pass: authKey.length === 2 ? authKey[1] : '',
        };
      } else if (scheme.scheme === 'bearer') {
        preparedAuth[scheme._key] = authKey[0];
      }
      break;

    case 'oauth2':
      preparedAuth[scheme._key] = authKey[0];
      break;

    case 'apiKey':
      if (scheme.in === 'query' || scheme.in === 'header' || scheme.in === 'cookie') {
        preparedAuth[scheme._key] = authKey[0];
      }
      break;

    default:
      throw new Error(
        `Sorry, this API currently uses a security scheme, ${scheme.type}, which this library doesn't yet support.`
      );
  }

  return preparedAuth;
}
