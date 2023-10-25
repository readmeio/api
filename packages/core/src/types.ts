export interface ConfigOptions {
  /**
   * Override the default `fetch` request timeout of 30 seconds. This number should be represented
   * in milliseconds.
   */
  timeout?: number;
}

/**
 * @see {@link https://stackoverflow.com/a/39495173}
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type HTTPMethodRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export interface FetchResponse<HTTPStatus, Data> {
  data: Data;
  headers: Headers;
  res: Response;
  status: HTTPStatus;
}
