function stripTrailingSlash(url) {
  if (url[url.length - 1] === '/') {
    return url.slice(0, -1);
  }

  return url;
}

/**
 * With an SDK server config and an instance of OAS we should extract and prepare the server and any server variables
 * to be supplied to `@readme/oas-to-har`.
 *
 * @param {Oas} spec
 * @param {String} url
 * @param {Object} variables
 * @returns {Object|Boolean}
 */
module.exports = (spec, url, variables = {}) => {
  let serverIdx;
  const sanitizedUrl = stripTrailingSlash(url);
  (spec.api.servers || []).forEach((server, i) => {
    if (server.url === sanitizedUrl) {
      serverIdx = i;
    }
  });

  // If we were able to find the passed in server in the OAS servers, we should use that! If we couldn't
  // and server variables were passed in we should try our best to handle that, otherwise we should ignore
  // the passed in server and use whever the default from the OAS is.
  if (serverIdx) {
    return {
      selected: serverIdx,
      variables,
    };
  } else if (Object.keys(variables).length) {
    // @todo we should run `oas.replaceUrl(url)` and pass that unto `@readme/oas-to-har`
  } else {
    const server = spec.splitVariables(url);
    if (server) {
      return {
        selected: server.selected,
        variables: server.variables,
      };
    }

    // @todo we should pass `url` directly into `@readme/oas-to-har` as the base URL
  }

  return false;
};
