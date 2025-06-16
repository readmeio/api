import type { ConfigOptions } from './types.js';
import type { AuthForHAR, DataForHAR } from '@readme/oas-to-har/lib/types';
import type { Har } from 'har-format';
import type { Operation } from 'oas/operation';
import type { HttpMethods, OASDocument } from 'oas/types';

import oasToHar from '@readme/oas-to-har';
import fetchHar from 'fetch-har';
import Oas from 'oas';

import FetchError from './errors/fetchError.js';
import { parseResponse, prepareAuth, prepareParams, prepareServer } from './lib/index.js';
import { logger } from './logger.js';

export default class APICore {
  spec!: Oas;

  private auth: (number | string)[] = [];

  private server:
    | false
    | {
        url: string;
        variables?: Record<string, number | string>;
      } = false;

  private config: ConfigOptions = {};

  private userAgent!: string;

  private debugMode: boolean = false;

  constructor(definition?: OASDocument | Record<string, unknown>, userAgent?: string) {
    if (definition) this.spec = Oas.init(definition);
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

  setAuth(...values: number[] | string[]) {
    this.auth = values;
    return this;
  }

  setServer(url: string, variables: Record<string, number | string> = {}) {
    this.server = { url, variables };
    return this;
  }

  setDebugMode(debugMode: boolean) {
    this.debugMode = debugMode;
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

  /**
   * Retrieve a HAR for a given HTTP request.
   *
   * @internal
   */
  getHARForRequest(operation: Operation, data: DataForHAR, auth: AuthForHAR) {
    return oasToHar(this.spec, operation, data, auth);
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

      const har = this.getHARForRequest(operation, data, prepareAuth(this.auth, operation));

      if (this.debugMode) {
        logger(`[DEBUG] HAR: ${JSON.stringify(har, null, 2)}`);
      }

      let timeoutSignal: NodeJS.Timeout;
      const init: RequestInit = {};
      if (this.config.timeout) {
        const controller = new AbortController();
        timeoutSignal = setTimeout(() => controller.abort(), this.config.timeout);
        init.signal = controller.signal;
      }

      // `getHarForRequest` returns a partial HAR object, by way of `@readme/oas-to-har` but
      // `fetch-har` is typed to expect the full thing. Though we're supplying an incomplete HAR
      // object, at least the spec, our partial is fine.
      return fetchHar(har as unknown as Har, { files: data.files || {}, init, userAgent: this.userAgent })
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
