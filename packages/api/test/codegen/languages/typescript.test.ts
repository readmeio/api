import type { TSGeneratorOptions } from '../../../src/codegen/languages/typescript.js';

import fs from 'node:fs/promises';
import path from 'node:path';

import { loadSpec, responses as mockResponse } from '@api/test-utils';
import fetchMock from 'fetch-mock';
import Oas from 'oas';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

import TSGenerator from '../../../src/codegen/languages/typescript.js';
import * as packageInfo from '../../../src/packageInfo.js';
import Storage from '../../../src/storage.js';

function assertSDKFixture(file: string, fixture: string, opts: TSGeneratorOptions = {}) {
  return async () => {
    const oas = await loadSpec(require.resolve(file)).then(Oas.init);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, file, fixture, opts);
    const actualFiles = await ts.generator();

    // Determine if the generated code matches what we've got in our fixture.
    const dir = path.resolve(path.join(__dirname, '..', '..', '__fixtures__', 'sdk', fixture));

    let expectedFiles: string[];
    try {
      expectedFiles = await fs.readdir(dir);
    } catch (err) {
      /**
       * @todo it'd be cool if we could supply this with a `--update` arg to create the fixture dir
       */
      throw new Error(`No SDK fixture directory exists for "${fixture}"`);
    }

    // Assert that the files we're generating are what we're expecting in the fixture directory.
    // We're sorting this data because  `index.d.ts` files are generated last but are first in the
    // filesystem.
    const sortedActualFiles = Object.keys(actualFiles);
    sortedActualFiles.sort();
    expect(sortedActualFiles).toStrictEqual(expectedFiles);

    // Assert that each generated file is the same as in the fixture.
    await Promise.all(
      expectedFiles.map(filename => {
        const actual = actualFiles[filename];

        // We have to wrap in our current package version into the `<<useragent>>` placeholder so
        // we don't need to worry about committing package versions into source control or trying
        // to mock out our `packageInfo` library, potentially causing sideeffects in other tests.
        return new Promise((resolve, reject) => {
          fs.readFile(path.join(dir, filename), 'utf8')
            .then(expected => expected.replace('<<package version>>', packageInfo.PACKAGE_VERSION))
            .then(expected => {
              expect(actual).toBe(expected);
              resolve(true);
            })
            .catch(reject);
        });
      }),
    );

    // Make sure that we can load the SDK without any TS compilation errors.
    const sdk = await import(`../../__fixtures__/sdk/${fixture}`).then(r => r.default);
    expect(sdk.constructor.name).toBe('SDK');
  };
}

describe('typescript', () => {
  describe('#installer', () => {
    beforeEach(() => {
      Storage.setStorageDir(uniqueTempDir());
    });

    afterEach(() => {
      Storage.reset();
    });

    it('should install a `package.json` and the required packages', async () => {
      const logger = vi.fn();

      const file = require.resolve('@readme/oas-examples/3.0/json/petstore.json');
      const oas = await loadSpec(file).then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const storage = new Storage(file, 'petstore');
      await storage.load();

      const ts = new TSGenerator(oas, './openapi.json', 'petstore', { compilerTarget: 'cjs' });
      await ts.installer(storage, { logger, dryRun: true });

      const pkgJson = await fs
        .readFile(path.join(storage.getIdentifierStorageDir(), 'package.json'), 'utf-8')
        .then(JSON.parse);

      expect(pkgJson).toStrictEqual({
        name: '@api/petstore',
        version: '1.0.0',
        main: './index.ts',
        types: './index.d.ts',
      });

      expect(logger).toHaveBeenCalledWith('npm install --save --dry-run api json-schema-to-ts oas');

      /**
       * NPM has an incredibly difficult time trying to resolve this temp dir when installing
       * packages from within a unit test and always craps out with a "Cannot set properties of
       * null (setting 'dev')" error. Because we know this works in real-life, attempting to work
       * around NPM bugs is not worth my time so we aren't asserting this now. It'd be nice to
       * recheck this in the future, or find an alternate solution for installing packages that is
       * less prone to NPM quirks.
       *
       * @fixme
       */
      // expect(logger).to.be.calledWith(`npm install --save --dry-run ${storage.getIdentifierStorageDir()}`);
    }, 20000);
  });

  describe('#generator', () => {
    it(
      'should generate typescript (by default)',
      assertSDKFixture('@api/test-utils/definitions/simple.json', 'simple-ts'),
    );

    it(
      'should be able to generate valid TS when a body is optional but metadata isnt',
      assertSDKFixture('@api/test-utils/definitions/optional-payload.json', 'optional-payload'),
    );

    it('should work against the petstore', assertSDKFixture('@readme/oas-examples/3.0/json/petstore.json', 'petstore'));

    it('should work against our OAS', assertSDKFixture('@readme/oas-examples/3.0/json/readme.json', 'readme'));

    // This SDK only has an `index.ts` as it has no schemas.
    it(
      'should handle some quirky `operationId` cases',
      assertSDKFixture('@api/test-utils/definitions/operationid-quirks.json', 'operationid-quirks'),
    );

    it(
      'should handle `title` props that start with a number',
      assertSDKFixture('@api/test-utils/definitions/response-title-quirks.json', 'response-title-quirks'),
    );

    it.todo('should handle a operations with a `default` response');

    it(
      'should handle an api that has discriminators and no operation ids',
      assertSDKFixture('@api/test-utils/definitions/alby.json', 'alby'),
    );

    describe('javascript generation', () => {
      it(
        'should generate a CommonJS library',
        assertSDKFixture('@api/test-utils/definitions/simple.json', 'simple-js-cjs', { outputJS: true }),
      );

      it(
        'should generate am ESM library',
        assertSDKFixture('@api/test-utils/definitions/simple.json', 'simple-js-esm', {
          outputJS: true,
          compilerTarget: 'esm',
        }),
      );
    });

    describe('integration', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      it('should be able to make an API request (TS)', async () => {
        const sdk = await import('../../__fixtures__/sdk/simple-ts/index.js').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).toBe('/v2/pet/findByStatus?status=available');
          expect(status).toBe(200);
          expect(headers.constructor.name).toBe('Headers');
          expect(res.constructor.name).toBe('Response');
        });
      });

      it('should be able to make an API request with an `accept` header`', async () => {
        const sdk = await import('../../__fixtures__/sdk/simple-ts/index.js').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.headers);

        await sdk
          .findPetsByStatus({ status: ['available'], accept: 'application/xml' })
          .then(({ data, status, headers, res }) => {
            expect(data).toHaveProperty('accept', 'application/xml');
            expect(status).toBe(200);
            expect(headers.constructor.name).toBe('Headers');
            expect(res.constructor.name).toBe('Response');
          });
      });

      /**
       * This test is impossible to run now because its a `.js` file that's loading ESM code. The
       * CJS SDK we're generating here should have a `.cjs` extension but we're going to overhaul
       * this entire codegen process with `tsup` so this test is being skipped for now.
       *
       * @see {@link https://github.com/readmeio/api/pull/734}
       */
      it.skip('should be able to make an API request (JS + CommonJS)', async () => {
        const sdk = await import('../../__fixtures__/sdk/simple-js-cjs/index.js').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).toBe('/v2/pet/findByStatus?status=available');
          expect(status).toBe(200);
          expect(headers.constructor.name).toBe('Headers');
          expect(res.constructor.name).toBe('Response');
        });
      });

      it('should be able to make an API request (JS + ESM)', async () => {
        const sdk = await import('../../__fixtures__/sdk/simple-js-esm/index.js').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).toBe('/v2/pet/findByStatus?status=available');
          expect(status).toBe(200);
          expect(headers.constructor.name).toBe('Headers');
          expect(res.constructor.name).toBe('Response');
        });
      });
    });

    describe('error handling', () => {
      it('should fail on an API definition that has no `paths`', async () => {
        const oas = Oas.init({
          openapi: '3.0.3',
          info: {
            title: 'empty oas',
            version: '1.0.0',
          },
          paths: {},
        });

        const ts = new TSGenerator(oas, 'no-paths', './no-paths.json');
        await expect(ts.generator()).rejects.toThrow(
          'Sorry, this OpenAPI definition does not have any operation paths to generate an SDK for.',
        );
      });

      it('should fail on an API definition that contains circular references', async () => {
        const oas = await loadSpec('@readme/oas-examples/3.0/json/circular.json').then(Oas.init);
        await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

        expect(() => {
          return new TSGenerator(oas, 'circular', './circular.json');
        }).toThrow(
          'Sorry, this library does not yet support generating an SDK for an OpenAPI definition that contains circular references.',
        );
      });
    });
  });
});
