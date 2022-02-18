import chai from 'chai';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
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
      // eslint-disable-next-line no-underscore-dangle
      !this._obj.filter(obj => '$ref' in obj).length,
      'expected #{this} to be dereferenced',
      'expected #{this} to not dereferenced'
    );
  });
}
