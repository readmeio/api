import type { FromSchema } from 'json-schema-to-ts';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][];
  constructor();
  /**
   * Optionally configure various options, such as response parsing, that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.parseResponse If responses are parsed according to its `Content-Type` header.
   */
  config(config: ConfigOptions): void;
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
  auth(...values: string[] | number[]): this;
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
  server(url: string, variables?: {}): void;
  get(path: '/anything', metadata: GetAnythingMetadataParam): Promise<GetAnythingResponse2Xx>;
  getAnything(metadata: GetAnythingMetadataParam): Promise<GetAnythingResponse2Xx>;
}
declare const createSDK: SDK;
export default createSDK;
interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}
declare const schemas: {
  readonly getAnything: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly status: {
              readonly type: 'array';
              readonly items: {
                readonly type: 'string';
                readonly enum: readonly ['available', 'pending', 'sold'];
                readonly default: 'available';
              };
              readonly $schema: 'https://json-schema.org/draft/2020-12/schema#';
              readonly description: 'Status values that need to be considered for filter';
            };
          };
          readonly required: readonly ['status'];
        }
      ];
    };
    readonly response: {
      readonly '2XX': {
        readonly oneOf: readonly [
          {
            readonly title: '260 Created (token)';
            readonly type: 'object';
            readonly properties: {
              readonly id: {
                readonly type: 'string';
                readonly examples: readonly ['e450ec69-dac2-4858-b4c9-6d3af44bb5f8'];
              };
            };
          },
          {
            readonly title: '260 Created';
            readonly type: 'object';
            readonly properties: {
              readonly id: {
                readonly type: 'string';
                readonly examples: readonly ['e450ec69-dac2-4858-b4c9-6d3af44bb5f8'];
              };
            };
          }
        ];
        readonly $schema: 'https://json-schema.org/draft/2020-12/schema#';
      };
    };
  };
};
declare type GetAnythingMetadataParam = FromSchema<typeof schemas.getAnything.metadata>;
declare type GetAnythingResponse2Xx = FromSchema<typeof schemas.getAnything.response['2XX']>;
