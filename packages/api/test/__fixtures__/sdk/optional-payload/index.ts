import type * as types from './types';
import type { ConfigOptions } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from '../../../__fixtures__/definitions/optional-payload.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'optional-payload/1.0.0 (api/5.0-unit-testing)');
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

  /**
   * Updates a pet in the store with form data
   *
   */
  post<T = unknown>(
    path: '/pet/{petId}',
    body: types.UpdatePetWithFormFormDataParam,
    metadata: types.UpdatePetWithFormMetadataParam
  ): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  post<T = unknown>(
    path: '/pet/{petId}',
    metadata: types.UpdatePetWithFormMetadataParam
  ): Promise<T>;
  /**
   * Access any POST endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  post<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, 'post', body, metadata);
  }

  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm<T = unknown>(
    body: types.UpdatePetWithFormFormDataParam,
    metadata: types.UpdatePetWithFormMetadataParam
  ): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm<T = unknown>(metadata: types.UpdatePetWithFormMetadataParam): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm<T = unknown>(
    body?: types.UpdatePetWithFormFormDataParam,
    metadata?: types.UpdatePetWithFormMetadataParam
  ): Promise<T> {
    return this.core.fetch('/pet/{petId}', 'post', body, metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type { UpdatePetWithFormFormDataParam, UpdatePetWithFormMetadataParam } from './types';
