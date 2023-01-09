/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path from 'path';

import caseless from 'caseless';
import chai from 'chai';

import * as packageInfo from '../../src/packageInfo';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      /**
       * Assert that a Response headers object has a custom API-identifying `User Agent` header.
       */
      customUserAgent: void;

      /**
       * Assert that a given array within an OpenAPI definition has been dereferenced.
       */
      dereferenced: void;

      /**
       * Assert that the contents of a given SDK match what we're expecting against a specific
       * fixture.
       *
       * @param fixture Fixture directory in `test/__fixtures__/sdk/`.
       */
      toMatchSDKFixture: (fixture: string) => void;

      /**
       * Assert that a given HAR `headers` array has a given header matching a specific value.
       */
      header: (header: string, expected: string | RegExp) => void;
    }
  }
}

export default function chaiPlugins(_chai, utils) {
  utils.addProperty(chai.Assertion.prototype, 'customUserAgent', function () {
    const userAgent = this._obj['user-agent'];

    this.assert(
      userAgent.match(/^api \(node\)\/(\d+.\d+(.\d+|unit-testing))$/),
      `expected "${userAgent}" to be a custom user agent`,
      `expected "${userAgent}" to not be a custom user agent`
    );
  });

  utils.addProperty(chai.Assertion.prototype, 'dereferenced', function () {
    this.assert(
      !this._obj.filter(obj => '$ref' in obj).length,
      'expected #{this} to be dereferenced',
      'expected #{this} to not dereferenced'
    );
  });

  utils.addMethod(chai.Assertion.prototype, 'toMatchSDKFixture', function (fixture: string) {
    const dir = path.resolve(`test/__fixtures__/sdk/${fixture}`);
    const actualFiles: Record<string, string> = this._obj;

    let expectedFiles;
    try {
      expectedFiles = fs.readdirSync(dir);
    } catch (err) {
      // @todo it'd be cool if we could supply this with a `--update` arg to create the fixture dir
      throw new Error(`No SDK fixture directory exists for "${fixture}"`);
    }

    // Assert that the files we're generating are what we're expecting in the fixture directory.
    const sortedActualFiles = Object.keys(actualFiles);
    sortedActualFiles.sort(); // `index.d.ts` files are generated last but are first in the filesystem

    new chai.Assertion(
      sortedActualFiles,
      "The generated files do not line up with what's in the fixture directory."
    ).to.be.deep.equal(expectedFiles);

    // Assert that each generated file is the same as in the fixture.
    expectedFiles.forEach(file => {
      const actual = actualFiles[file];

      // We have to wrap in our current package version into the `<<useragent>>` placeholder so we
      // don't need to worry about committing package versions into source control or trying to mock
      // out our `packageInfo` library, potentially causing sideeffects in other tests.
      const expected = fs
        .readFileSync(path.join(dir, file), 'utf8')
        .replace('<<package version>>', packageInfo.PACKAGE_VERSION);

      new chai.Assertion(actual, `${file} does not match`).to.equal(expected);
    });
  });

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
   * @param {string} header
   * @param {string|RegExp} expected
   */
  utils.addMethod(chai.Assertion.prototype, 'header', function (header, expected) {
    const obj = utils.flag(this, 'object') as Headers;
    const headers = caseless(Object.fromEntries(Array.from(obj.entries())));

    if (expected.constructor.name === 'RegExp') {
      new chai.Assertion(headers.get(header)).to.match(expected);
    } else if (Array.isArray(expected)) {
      new chai.Assertion(headers.get(header)).to.oneOf(expected.map(e => e.toString()));
    } else {
      new chai.Assertion(headers.get(header)).to.equal(expected.toString());
    }
  });
}
