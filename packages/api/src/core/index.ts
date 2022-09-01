import type Oas from 'oas';
import type { Operation } from 'oas';
import type { HttpMethods } from 'oas/dist/rmoas.types';

import oasToHar from '@readme/oas-to-har';
import fetchHar from 'fetch-har';
import { FormDataEncoder } from 'form-data-encoder';
import 'isomorphic-fetch';

import getJSONSchemaDefaults from './getJSONSchemaDefaults';
import parseResponse from './parseResponse';
import prepareAuth from './prepareAuth';
import prepareParams from './prepareParams';
import prepareServer from './prepareServer';

export interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You can
   * disable this functionality by negating this option.
   */
  parseResponse: boolean;
}

export { getJSONSchemaDefaults, parseResponse, prepareAuth, prepareParams, prepareServer };

export default class APICore {
  spec: Oas;

  private auth: (number | string)[] = [];

  private server:
    | false
    | {
        url?: string;
        variables?: Record<string, string | number>;
      } = false;

  private config: ConfigOptions = { parseResponse: true };

  private userAgent: string;

  constructor(spec?: Oas, userAgent?: string) {
    this.spec = spec;
    this.userAgent = userAgent;
  }

  setSpec(spec: Oas) {
    this.spec = spec;
  }

  setConfig(config: ConfigOptions) {
    this.config = config;
    return this;
  }

  setUserAgent(userAgent: string) {
    this.userAgent = userAgent;
    return this;
  }

  setAuth(...values: string[] | number[]) {
    this.auth = values;
    return this;
  }

  setServer(url: string, variables: Record<string, string | number> = {}) {
    this.server = { url, variables };
    return this;
  }

  async fetch(path: string, method: HttpMethods, body?: unknown, metadata?: Record<string, unknown>) {
    const operation = this.spec.operation(path, method);

    return this.fetchOperation(operation, body, metadata);
  }

  async fetchOperation(operation: Operation, body?: unknown, metadata?: Record<string, unknown>) {
    return prepareParams(operation, body, metadata).then(params => {
      const data = { ...params };

      // If `sdk.server()` has been issued data then we need to do some extra work to figure out
      // how to use that supplied server, and also handle any server variables that were sent
      // alongside it.
      if (this.server) {
        const preparedServer = prepareServer(this.spec, this.server.url, this.server.variables);
        if (preparedServer) {
          data.server = preparedServer;
        }
      }

      // @ts-expect-error `this.auth` typing is off. FIXME
      const har = oasToHar(this.spec, operation, data, prepareAuth(this.auth, operation));

      return fetchHar(har as any, {
        userAgent: this.userAgent,
        files: data.files || {},
        multipartEncoder: FormDataEncoder,
      }).then((res: Response) => {
        if (res.status >= 400 && res.status <= 599) {
          throw res;
        }

        if (this.config.parseResponse === false) return res;

        return parseResponse(res);
      });
    });
  }
}
