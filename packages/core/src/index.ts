import type { Har } from 'har-format';
import type Oas from 'oas';
import type Operation from 'oas/operation';
import type { HttpMethods } from 'oas/rmoas.types';

import oasToHar from '@readme/oas-to-har';
import fetchHar from 'fetch-har';

import FetchError from './errors/fetchError';
import getJSONSchemaDefaults from './lib/getJSONSchemaDefaults';
import parseResponse from './lib/parseResponse';
import prepareAuth from './lib/prepareAuth';
import prepareParams from './lib/prepareParams';
import prepareServer from './lib/prepareServer';

export interface ConfigOptions {
  /**
   * Override the default `fetch` request timeout of 30 seconds. This number should be represented
   * in milliseconds.
   */
  timeout?: number;
}

export interface FetchResponse<HTTPStatus, Data> {
  data: Data;
  headers: Headers;
  res: Response;
  status: HTTPStatus;
}

// https://stackoverflow.com/a/39495173
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type HTTPMethodRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export { getJSONSchemaDefaults, parseResponse, prepareAuth, prepareParams, prepareServer };

export default class APICore {
  spec!: Oas;

  private auth: (number | string)[] = [];

  private server:
    | false
    | {
        url: string;
        variables?: Record<string, string | number>;
      } = false;

  private config: ConfigOptions = {};

  private userAgent!: string;

  constructor(spec?: Oas, userAgent?: string) {
    if (spec) this.spec = spec;
    if (userAgent) this.userAgent = userAgent;
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

  async fetch<HTTPStatus extends number = number>(
    path: string,
    method: HttpMethods,
    body?: unknown,
    metadata?: Record<string, unknown>,
  ) {
    const operation = this.spec.operation(path, method);

    return this.fetchOperation<HTTPStatus>(operation, body, metadata);
  }

  async fetchOperation<HTTPStatus extends number = number>(
    operation: Operation,
    body?: unknown,
    metadata?: Record<string, unknown>,
  ) {
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

      let timeoutSignal: NodeJS.Timeout;
      const init: RequestInit = {};
      if (this.config.timeout) {
        const controller = new AbortController();
        timeoutSignal = setTimeout(() => controller.abort(), this.config.timeout);
        init.signal = controller.signal;
      }

      return fetchHar(har as Har, {
        files: data.files || {},
        init,
        userAgent: this.userAgent,
      })
        .then(async (res: Response) => {
          const parsed = await parseResponse<HTTPStatus>(res);

          if (res.status >= 400 && res.status <= 599) {
            throw new FetchError<typeof parsed.status, typeof parsed.data>(
              parsed.status,
              parsed.data,
              parsed.headers,
              parsed.res,
            );
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
