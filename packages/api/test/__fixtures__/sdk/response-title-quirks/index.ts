import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from '../../../__fixtures__/definitions/response-title-quirks.json';

class SDK {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][] = [];

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'response-title-quirks/1.0.0 (api/5.0-unit-testing)');
  }

  /**
   * Optionally configure various options, such as response parsing, that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.parseResponse If responses are parsed according to its `Content-Type` header.
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

  get(path: '/anything', metadata: GetAnythingMetadataParam): Promise<GetAnything_Response_2XX>;
  /**
   * Access any GET endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  get<T = unknown>(path: string, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, 'get', metadata);
  }

  getAnything(metadata: GetAnythingMetadataParam): Promise<GetAnything_Response_2XX> {
    return this.core.fetch('/anything', 'get', metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}
type GetAnythingMetadataParam = {
  /**
   * Status values that need to be considered for filter
   */
  status: ('available' | 'pending' | 'sold')[];
  [k: string]: unknown;
};
type GetAnything_Response_2XX = _260CreatedToken | _260Created;
interface _260CreatedToken {
  id?: string;
  [k: string]: unknown;
}
interface _260Created {
  id?: string;
  [k: string]: unknown;
}
