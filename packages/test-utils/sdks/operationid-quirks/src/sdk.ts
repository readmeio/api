import type { ConfigOptions, FetchResponse } from '@readme/api-core/types';
import APICore from '@readme/api-core';
import definition from '@api/test-utils/definitions/operationid-quirks.json' with {
  type: 'json'
};

export default class SDK {
  core: APICore;

  constructor() {
    this.core = new APICore(definition, 'operationid-quirks/1.0.0 (api/7.0.0-mock)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * This mess of a string is intentionally nasty so we can be sure that we're not including
   * anything that wouldn't look right as an operationID for a potential method accessor in
   * `api`.
   *
   */
  quirky_OperationId_string(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/quirky-operationId', 'get');
  }

  /**
   * This operation doesn't have an `operationId` so we should create one.
   *
   */
  getNoOperationId(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/no-operation-id', 'get');
  }

  /**
   * This operation has no `operationId` but because path starts with an HTTP method when we
   * generate an `operationId` that has `get` doubled.
   *
   */
  getOperationPathStartsWithAnHttpMethod(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/get-operation-path-starts-with-an-http-method', 'get');
  }

  /**
   * This operation has an `operationId` with hypens yet it should still be accessible in the
   * dynamic `api` flow.
   *
   */
  hyphenatedOperationId(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/hyphenated-operation-id', 'get');
  }
}
