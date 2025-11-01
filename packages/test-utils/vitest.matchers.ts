import type { ParameterObject } from 'oas/types';

import caseless from 'caseless';
import { expect } from 'vitest';

interface CustomMatchers<R = unknown> {
  /**
   * Assert that a given array within an OpenAPI definition has been dereferenced.
   */
  toBeDereferenced(): R;

  /**
   * Determine if a given `Headers` object has a given header matching a specific value.
   *
   * @example <caption>should match a value</caption>
   * expect(request.headers).to.have.header('connection', 'close');
   *
   * @example <caption>should match a regex</caption>
   * expect(response.headers).to.have.header('content-type', /application\/json(;\s?charset=utf-8)?/);
   *
   * @example <caption>should match one of many values</caption>
   * expect(request.headers).to.have.header('connection', ['close', 'keep-alive']);
   *
   */
  toHaveHeader(header: string, expected: (number | string)[] | RegExp | string): R;
}

declare module 'vitest' {
  // biome-ignore lint/suspicious/noExplicitAny: This is the correct typing.
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toBeDereferenced(spec: ParameterObject[]) {
    const pass = !spec.filter(obj => '$ref' in obj).length;
    if (!pass) {
      return {
        message: () => 'expected the spec to be dereferenced',
        pass: false,
      };
    }

    return {
      message: () => 'expected the spec to not be dereferenced',
      pass: true,
    };
  },

  toHaveHeader(obj: Headers, header: string, expected: (number | string)[] | RegExp | string) {
    // @ts-expect-error `Headers.entries()` exists despite what the types here suggest.
    const headers = caseless(Object.fromEntries(Array.from(obj.entries())));

    // Header value should match a given regex.
    if (expected instanceof RegExp) {
      if (!expected.test(headers.get(header))) {
        return {
          message: () => `expected header to match ${expected.source}\n\nreceived: ${header}`,
          pass: false,
        };
      }

      return {
        message: () => `expected header to not match ${expected.source}\n\nreceived: ${header}`,
        pass: true,
      };
    }

    // Header value should exist in a given list.
    if (Array.isArray(expected)) {
      if (!expected.some(h => h === headers.get(header))) {
        return {
          message: () => `expected header to be one of the following: ${expected}\n\nreceived: ${header}`,
          pass: false,
        };
      }

      return {
        message: () => `expected header to not be one of the following: ${expected}\n\nreceived: ${header}`,
        pass: true,
      };
    }

    // Header value should match a given value.
    if (headers.get(header) !== expected) {
      return {
        message: () => `expected header to be ${expected}\n\nreceived: ${header}`,
        pass: false,
      };
    }

    return {
      message: () => `expected header not to be ${expected}\n\nreceived: ${header}`,
      pass: true,
    };
  },
});
