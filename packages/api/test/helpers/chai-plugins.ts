/* eslint-disable no-underscore-dangle */
import chai from 'chai';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      customUserAgent: void;
      dereferenced: void;
    }
  }
}

export default function chaiPlugins(_chai, utils) {
  /**
   * Assert that a given array within an OpenAPI definition has been dereferenced.
   */
  utils.addProperty(chai.Assertion.prototype, 'dereferenced', function () {
    this.assert(
      !this._obj.filter(obj => '$ref' in obj).length,
      'expected #{this} to be dereferenced',
      'expected #{this} to not dereferenced'
    );
  });

  /**
   * Assert that a Response headers object has a custom API-identifying User Agent header.
   */
  utils.addProperty(chai.Assertion.prototype, 'customUserAgent', function () {
    const userAgent = this._obj['user-agent'][0];

    this.assert(
      userAgent.match(/api \(node\)\/\d+.\d+.\d+/),
      `expected "${userAgent}" to be a custom user agent`,
      `expected "${userAgent}" to not be a custom user agent`
    );
  });
}
