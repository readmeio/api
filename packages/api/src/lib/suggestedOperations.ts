import type { AuthForHAR } from '@readme/oas-to-har/lib/types';
import type Oas from 'oas';
import type Operation from 'oas/operation';

import APICore from '@readme/api-core';
import apiSnippetPlugin from 'httpsnippet-client-api';
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
 * We're intentionally using `httpsnippet-client-api` and not `@readme/oas-to-snippet` here,
 * which would handle HAR and snippet generation, because don't need the entire `oas-to-snippet`
 * and `@readme/httpsnippet` libraries for what we're doing here.
 *
 * All we want to do is generate a very simple code example for `api` snippets and as we're
 * controlling which kinds of endpoints we're generating these for the HAR dataset we're working
 * with is a mostly fully known object.
 *
 */
export async function buildCodeSnippetForOperation(oas: Oas, operation: Operation, opts: { identifier: string }) {
  const core = new APICore();
  core.setSpec(oas);

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

  const har = core.getHARForRequest(operation, {}, auth)?.log?.entries?.[0]?.request;
  if (!har) {
    return false;
  }

  const snippet = apiSnippetPlugin.client.convert(
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
      api: {
        definition: oas.getDefinition(),
        identifier: opts.identifier,
        registryURI: opts.identifier,
      },
    },
  );

  return snippet;
}
