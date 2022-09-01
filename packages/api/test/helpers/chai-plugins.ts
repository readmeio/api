/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path from 'path';

import chai from 'chai';

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
    }
  }
}

export default function chaiPlugins(_chai, utils) {
  utils.addProperty(chai.Assertion.prototype, 'customUserAgent', function () {
    const userAgent = this._obj['user-agent'];

    this.assert(
      userAgent.match(/api \(node\)\/\d+.\d+.\d+/),
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
      const expected = fs.readFileSync(path.join(dir, file), 'utf8');
      new chai.Assertion(actualFiles[file], `${file} does not match`).to.equal(expected);
    });
  });
}
