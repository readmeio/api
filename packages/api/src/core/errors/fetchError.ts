class FetchError extends Error {
  /** HTTP Status */
  status: number;

  /** The content of the response. */
  data: unknown;

  /** The Headers of the response. */
  headers: Headers;

  /** The raw `Response` object. */
  res: Response;

  constructor(status: number, data: unknown, headers: Headers, res: Response) {
    super(res.statusText);

    this.name = 'FetchError';
    this.status = status;
    this.data = data;
    this.headers = headers;
    this.res = res;

    // We could fix this by updating our target to ES2015 but because we support exporting to CJS
    // we can't.
    //
    // https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}

export default FetchError;
