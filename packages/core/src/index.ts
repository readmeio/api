import type Oas from 'oas';
import type { HttpMethods } from 'oas/@types/rmoas.types';

import 'isomorphic-fetch';
import fetchHar from 'fetch-har';
import oasToHar from '@readme/oas-to-har';
import { FormDataEncoder } from 'form-data-encoder';

import getJSONSchemaDefaults from './lib/getJSONSchemaDefaults';
import parseResponse from './lib/parseResponse';
import prepareAuth from './lib/prepareAuth';
import prepareParams from './lib/prepareParams';
import prepareServer from './lib/prepareServer';

export { getJSONSchemaDefaults, parseResponse, prepareAuth, prepareParams, prepareServer };

export default class APICore {
  private spec: Oas;

  private userAgent: string;

  constructor(spec: Oas, userAgent?: string) {
    this.spec = spec;
    this.userAgent = userAgent;
  }

  setUserAgent(userAgent: string) {
    this.userAgent = userAgent;
  }

  async fetch(
    path: string,
    method: HttpMethods,
    body?: unknown,
    metadata?: Record<string, unknown>,
    config: {
      auth?: (number | string)[][];
      server?: {
        url: string;
        variables?: Record<string, string | number>;
      };
    } = {}
  ) {
    const operation = this.spec.operation(path, method);

    return prepareParams(operation, body, metadata).then(params => {
      const data = { ...params };

      // If `sdk.server()` has been issued data then we need to do some extra work to figure out
      // how to use that supplied server, and also handle any server variables that were sent
      // alongside it.
      if (config.server) {
        const preparedServer = prepareServer(this.spec, config.server.url, config.server.variables);
        if (preparedServer) {
          data.server = preparedServer;
        }
      }

      const har = oasToHar(this.spec, operation, data, prepareAuth(config.auth || [], operation));

      return fetchHar(har, {
        userAgent: this.userAgent,
        files: data.files || {},
        multipartEncoder: FormDataEncoder,
      }).then((res: Response) => {
        if (res.status >= 400 && res.status <= 599) {
          throw res;
        }

        return parseResponse(res);
      });
    });
  }
}
