import type Oas from 'oas';
import type { Operation } from 'oas';
import type { HttpMethods } from 'oas/dist/rmoas.types';

import oasToHar from '@readme/oas-to-har';
import fetchHar from 'fetch-har';
import { FormDataEncoder } from 'form-data-encoder';
import 'isomorphic-fetch';
// `AbortController` was shipped in Node 15 so when Node 14 is EOL'd we can drop this dependency.
import { AbortController } from 'node-abort-controller';

import FetchError from './errors/fetchError';
import getJSONSchemaDefaults from './getJSONSchemaDefaults';
import parseResponse from './parseResponse';
import prepareAuth from './prepareAuth';
import prepareParams from './prepareParams';
import prepareServer from './prepareServer';

export interface ConfigOptions {
  /**
   * Override the default `fetch` request timeout of 30 seconds. This number should be represented
   * in milliseconds.
   */
  timeout?: number;
}

export interface FetchResponse<status, data> {
  data: data;
  status: status;
  headers: Headers;
  res: Response;
}

// https://stackoverflow.com/a/39495173
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type HTTPMethodRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

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

  private config: ConfigOptions = {};

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

      let timeoutSignal: any;
      const init: RequestInit = {};
      if (this.config.timeout) {
        const controller = new AbortController();
        timeoutSignal = setTimeout(() => controller.abort(), this.config.timeout);
        // @todo Typing on `AbortController` coming out of `node-abort-controler` isn't right so when
        // we eventually drop that dependency we can remove the `as any` here.
        init.signal = controller.signal as any;
      }

      return fetchHar(har as any, {
        files: data.files || {},
        init,
        multipartEncoder: FormDataEncoder,
        userAgent: this.userAgent,
      })
        .then(async (res: Response) => {
          const parsed = await parseResponse(res);

          if (res.status >= 400 && res.status <= 599) {
            throw new FetchError(parsed.status, parsed.data, parsed.headers, parsed.res);
          }

          return parsed;
        })
        .finally(() => {
          if (this.config.timeout) {
            clearTimeout(timeoutSignal);
          }
        });
    });
  }
}
