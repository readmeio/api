/**
 * With an SDK config object and an instance of OAS we should extract and prepare the server and any server variables
 * to be supplied to `@readme/oas-to-har`.
 *
 * @param {Object} config
 * @param {Oas} spec
 * @returns {Object|Boolean}
 */
module.exports = (config, spec) => {
  function stripTrailingSlash(url) {
    if (url[url.length - 1] === '/') {
      return url.slice(0, -1);
    }

    return url;
  }

  if (typeof config.server === 'string') {
    const server = spec.splitVariables(config.server);
    if (server) {
      return {
        selected: server.selected,
        variables: server.variables,
      };
    }

    // @todo we should pass `config.server` directly into `@readme/oas-to-har` as the base URL
  } else if (typeof config.server === 'object') {
    if ('url' in config.server) {
      // eslint-disable-next-line prefer-const
      let { url, ...variables } = config.server;
      url = stripTrailingSlash(url);

      let serverIdx;
      (spec.servers || []).forEach((server, i) => {
        if (server.url === url) {
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
        const server = spec.splitVariables(config.server.url);
        if (server) {
          return {
            selected: server.selected,
            variables: server.variables,
          };
        }

        // @todo we should pass `config.server.url` directly into `@readme/oas-to-har` as the base URL
      }
    }
  }

  return false;
};
