// @ts-check
/* eslint-disable import/no-commonjs */

/**
 * In `api` v6, this package was a JS library used JavaScript Proxies to dynamically generate SDKs at runtime.
 * This functionality has been sunset in `api` v7 to focus on its CLI, which builds strongly-typed SDKs.
 * This file is here to throw errors for users that attempt to use the legacy library.
 *
 *
 * @param {unknown} input
 */
module.exports = function legacyHandler(input) {
  let identifier = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.json';

  if (typeof input === 'string') {
    identifier = input;
  }

  throw new Error(`Oops! You're attempting to use a legacy usage pattern that no longer exists.

You can read more about this in our docs: TKTK

\`api\` can now generate strongly-typed SDKs that work in pretty much every JS runtime!

Try running this command to get started:

npx api@latest install ${identifier}
`);
};
