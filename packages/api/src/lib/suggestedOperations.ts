import type { AuthForHAR } from '@readme/oas-to-har/lib/types';
import type Oas from 'oas';
import type Operation from 'oas/operation';

import oasToHar from '@readme/oas-to-har';
import client from 'httpsnippet-client-api';
import { Webhook } from 'oas/operation';

/**
 * Return a list of suggested and "good first issue" types of endpoints that we can build a post-SDK
 * code generation code snippet around to demo the power of `api`.
 *
 * The criteria for a suggested endpoint are the following:
 *  - GET request
 *  - Has no required query or body parameters
 *  - Endpoint has not been deprecated
 *
 * @param oas
 */
export function getSuggestedOperation(oas: Oas) {
  const suggested: Operation[] = [];

  Object.values(oas.getPaths()).forEach(path => {
    Object.values(path).forEach(operation => {
      // We don't really support webhooks with this library so if this operation is one we shouldn't
      // return it as a recommended operation.
      if (operation instanceof Webhook) {
        return;
      }

      if (operation.isDeprecated()) {
        return;
      }

      if (operation.method.toLowerCase() === 'get') {
        const hasRequiredParameters = operation.hasRequiredParameters();
        const hasRequiredRequestBody = operation.hasRequiredRequestBody();

        // If the criteria matches, push it into a recommended array
        if (!hasRequiredParameters && !hasRequiredRequestBody) {
          suggested.push(operation);
        }
      }
    });
  });

  if (suggested.length) {
    return suggested[0];
  }

  return false;
}

/**
 * Generate an example code snippet for a given (suggested) operation. We'll show this to users
 * post-codegeneration so they can see how to use the SDK we created for them.
 *
 */
export async function buildCodeSnippetForOperation(oas: Oas, operation: Operation, opts: { identifier: string }) {
  // If this endpoint has authentication on it then we should try to flesh out some placeholder
  // values in the `.auth()` SDK method for them so they can see how to use auth.
  let auth: AuthForHAR = {};
  const hasAuth = !!operation.getSecurity()?.length;
  if (hasAuth) {
    operation.getSecurityWithTypes().forEach(schemes => {
      if (!schemes) return;
      schemes.filter(Boolean).forEach(scheme => {
        if (!scheme) return;

        // eslint-disable-next-line no-underscore-dangle
        const schemeName = scheme.security._key;
        if (scheme?.type === 'Basic') {
          auth[schemeName] = { user: 'username', pass: 'password' };
        } else {
          auth[schemeName] = 'token';
        }
      });
    });

    auth = oas.getAuth(auth) as AuthForHAR;
  }

  // We're pulling in `@reamde/oas-to-har` and `httpsnippet-client-api` here instead of using
  // `@readme/oas-to-snippet`, which would handle both, because we don't need the entire
  // `oas-to-snippet` for what we're doing here. All we want to do is generate a very simple code
  // example for `api` snippets and because we're controlling which kinds of endpoints we're
  // generating this for the HAR dataset we're working with here is mostly a fully known object.
  const har = oasToHar(oas, operation, undefined, auth)?.log?.entries?.[0]?.request;
  if (!har) {
    return false;
  }

  const snippet = client.convert(
    {
      ...har,
      cookiesObj: har.cookies.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
      fullUrl: har.url,
      headersObj: har.headers.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
      postData: {
        mimeType: 'application/json',
        text: '',
      },
      queryObj: har.queryString.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
      url: har.url,

      // These aren't used in `httpsnippet-client-api` so we don't need to bother hooking them up.
      allHeaders: {} as never,
      uriObj: {} as never,
    },
    {
      apiDefinition: oas.getDefinition(),
      apiDefinitionUri: opts.identifier,
      identifier: opts.identifier,
    },
  );

  return snippet;
}
