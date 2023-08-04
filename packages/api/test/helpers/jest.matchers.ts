import type { ParameterObject } from 'oas/dist/rmoas.types';

import caseless from 'caseless';

interface CustomMatchers<R = unknown> {
  /**
   * Assert that a given array within an OpenAPI definition has been dereferenced.
   */
  toBeDereferenced(): R;

  /**
   * Assert that a Response headers object has a custom API-identifying `User Agent` header.
   */
  toHaveCustomUserAgent(): R;

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
  toHaveHeader(header: string, expected: RegExp | (string | number)[] | string): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

expect.extend({
  toBeDereferenced(this: jest.MatcherUtils, spec: ParameterObject[]) {
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

  toHaveCustomUserAgent(this: jest.MatcherUtils, headers: string[]) {
    const { printReceived } = this.utils;
    const userAgent = headers['user-agent'];
    const pass = userAgent.match(/^api \(node\)\/(\d+.\d+(.\d+|unit-testing))$/);

    if (!pass) {
      return {
        message: () => `expected a custom \`user-agent\` header to be present.\n\n${printReceived(userAgent)}`,
        pass: false,
      };
    }

    return {
      message: () => `expected a custom \`user-agent\` header to not be present\n\n${printReceived(userAgent)}`,
      pass: true,
    };
  },

  toHaveHeader(this: jest.MatcherUtils, obj: Headers, header: string, expected: RegExp | (string | number)[] | string) {
    const { printReceived } = this.utils;
    const headers = caseless(Object.fromEntries(Array.from(obj.entries())));

    // Header value should match a given regex.
    if (expected instanceof RegExp) {
      if (!expected.test(headers.get(header))) {
        return {
          message: () => `expected header to match ${expected.source}\n\n${printReceived(header)}`,
          pass: false,
        };
      }

      return {
        message: () => `expected header to not match ${expected.source}\n\n${printReceived(header)}`,
        pass: true,
      };
    }

    // Header value should exist in a given list.
    if (Array.isArray(expected)) {
      if (!expected.some(h => h === headers.get(header))) {
        return {
          message: () => `expected header to be one of the following: ${expected}\n\n${printReceived(header)}`,
          pass: false,
        };
      }

      return {
        message: () => `expected header to not be one of the following: ${expected}\n\n${printReceived(header)}`,
        pass: true,
      };
    }

    // Header value should match a given value.
    if (headers.get(header) !== expected) {
      return {
        message: () => `expected header to be ${expected}\n\n${printReceived(header)}`,
        pass: false,
      };
    }

    return {
      message: () => `expected header not to be ${expected}\n\n${printReceived(header)}`,
      pass: true,
    };
  },
});
