import type * as types from './types.js';
import type { ConfigOptions, FetchResponse } from '@readme/api-core/types';
import APICore from '@readme/api-core';
import definition from '@api/test-utils/definitions/metrotransit.json';

class SDK {
  core: APICore;

  constructor() {
    this.core = new APICore(definition, 'metrotransit/2 (api/<<package version>>)');
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

  /** @throws FetchError<400, types.ProblemDetails> Bad Request */
  getNextripAgencies(): Promise<FetchResponse<200, types.GetNextripAgenciesResponse200>> {
    return this.core.fetch('/nextrip/agencies', 'get');
  }

  /** @throws FetchError<400, types.ProblemDetails> Bad Request */
  getNextripRoutes(): Promise<FetchResponse<200, types.GetNextripRoutesResponse200>> {
    return this.core.fetch('/nextrip/routes', 'get');
  }

  /** @throws FetchError<400, types.ProblemDetails> Bad Request */
  getNextripDirectionsRoute_id(metadata: types.GetNextripDirectionsRouteIdMetadataParam): Promise<FetchResponse<200, types.GetNextripDirectionsRouteIdResponse200>> {
    return this.core.fetch('/nextrip/directions/{route_id}', 'get', metadata);
  }

  /** @throws FetchError<400, types.ProblemDetails> Bad Request */
  getNextripStopsRoute_idDirection_id(metadata: types.GetNextripStopsRouteIdDirectionIdMetadataParam): Promise<FetchResponse<200, types.GetNextripStopsRouteIdDirectionIdResponse200>> {
    return this.core.fetch('/nextrip/stops/{route_id}/{direction_id}', 'get', metadata);
  }

  /** @throws FetchError<400, types.ProblemDetails> Bad Request */
  getNextripStop_id(metadata: types.GetNextripStopIdMetadataParam): Promise<FetchResponse<200, types.NexTripResult>> {
    return this.core.fetch('/nextrip/{stop_id}', 'get', metadata);
  }

  /** @throws FetchError<400, types.ProblemDetails> Bad Request */
  getNextripRoute_idDirection_idPlace_code(metadata: types.GetNextripRouteIdDirectionIdPlaceCodeMetadataParam): Promise<FetchResponse<200, types.NexTripResult>> {
    return this.core.fetch('/nextrip/{route_id}/{direction_id}/{place_code}', 'get', metadata);
  }

  /** @throws FetchError<400, types.ProblemDetails> Bad Request */
  getNextripVehiclesRoute_id(metadata: types.GetNextripVehiclesRouteIdMetadataParam): Promise<FetchResponse<200, types.GetNextripVehiclesRouteIdResponse200>> {
    return this.core.fetch('/nextrip/vehicles/{route_id}', 'get', metadata);
  }
}

/**
 * NexTrip API
 *
 * API for creating Metro Transit real-time departure information display (beta, subject to
 * change)
 *
 */
const createSDK = (() => { return new SDK(); })();

export default createSDK;
