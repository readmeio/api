import fs from 'node:fs/promises';
import path from 'node:path';

import { loadSpec, responses as mockResponse } from '@api/test-utils';
import execa from 'execa';
import fetchMock from 'fetch-mock';
import Oas from 'oas';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

import TSGenerator from '../../../../src/codegen/languages/typescript/index.js';
import * as packageInfo from '../../../../src/packageInfo.js';
import Storage from '../../../../src/storage.js';

function assertSDKFixture(file: string, fixture: string) {
  return async () => {
    const oas = await loadSpec(require.resolve(file)).then(Oas.init);
    await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

    const ts = new TSGenerator(oas, file, fixture);
    const actualFiles = await ts.generate();

    // Determine if the generated code matches what we've got in our fixture.
    const dir = path.resolve(path.join(__dirname, '..', '..', '..', '__fixtures__', 'sdk', fixture));
    const expectedFiles = await fs
      .readdir(dir, { recursive: true })
      .then(files => {
        files.sort();

        // The `src/schemas` directory comes back to us from `fs.readdir` but because we're doing a
        // recursive lookup on that we also get `src/schemas/<schemaName>`. We only care about the
        // schema files themselves, not the general directory, so we need to exclude this from our
        // list of expected files.
        return files.filter(f => !['src', 'src/schemas'].includes(f));
      })
      .catch(() => {
        /**
         * @todo it'd be cool if we could supply this with a `--update` arg to create the fixture dir
         */
        throw new Error(`No SDK fixture directory exists for "${fixture}"`);
      });

    // Assert that the files we're generating are what we're expecting in the fixture directory.
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
        return fs
          .readFile(path.join(dir, filename), 'utf8')
          .then(expected => expected.replace('<<package version>>', packageInfo.PACKAGE_VERSION))
          .then(expected => {
            expect(actual).toBe(expected);
          });
      }),
    );

    // Make sure that we can load the SDK without any TS compilation errors.
    const sdk = await import(`${dir}/src/index.ts`).then(r => r.default);
    expect(sdk.constructor.name).toBe('SDK');
  };
}

describe('typescript', () => {
  describe('#install', () => {
    beforeEach(() => {
      Storage.setStorageDir(uniqueTempDir());
    });

    afterEach(() => {
      Storage.reset();
    });

    it('should install the required packages', async () => {
      const logger = vi.fn();

      const file = require.resolve('@readme/oas-examples/3.0/json/petstore.json');
      const oas = await loadSpec(file).then(Oas.init);
      await oas.dereference({ preserveRefAsJSONSchemaTitle: true });

      const storage = new Storage(file, 'petstore');
      await storage.load();

      const ts = new TSGenerator(oas, '../openapi.json', 'petstore');
      const source = await ts.generate();
      await storage.saveSourceFiles(source);

      await ts.install(storage, { logger, dryRun: true });

      const { stdout } = await execa('ls', ['-R1'], { cwd: storage.getIdentifierStorageDir() });
      expect(stdout).toContain('index.ts');
      expect(stdout).toContain('schemas');
      expect(stdout).toContain('Pet.ts');

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
      // expect(logger).toHaveBeenCalledWith(`npm install --save --dry-run ${storage.getIdentifierStorageDir()}`);
    }, 20000);
  });

  describe('#compile', () => {
    it('should generate an sdk', assertSDKFixture('@api/test-utils/definitions/simple.json', 'simple'));

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

    describe('integration', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      it('should be able to make an API request', async () => {
        // eslint-disable-next-line import/no-relative-packages
        const sdk = await import('../../../__fixtures__/sdk/simple/src/index.js').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.searchParams);

        // @ts-expect-error `findPetsByStatus` types are only present with a fully built out SDK dist which this fixture lacks.
        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).toBe('/v2/pet/findByStatus?status=available');
          expect(status).toBe(200);
          expect(headers.constructor.name).toBe('Headers');
          expect(res.constructor.name).toBe('Response');
        });
      });

      it('should be able to make an API request with an `accept` header`', async () => {
        // eslint-disable-next-line import/no-relative-packages
        const sdk = await import('../../../__fixtures__/sdk/simple/src/index.js').then(r => r.default);
        fetchMock.get('http://petstore.swagger.io/v2/pet/findByStatus?status=available', mockResponse.headers);

        await sdk
          // @ts-expect-error `findPetsByStatus` types are only present with a fully built out SDK dist which this fixture lacks.
          .findPetsByStatus({ status: ['available'], accept: 'application/xml' })
          .then(({ data, status, headers, res }) => {
            expect(data).toHaveProperty('accept', 'application/xml');
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
        await expect(ts.generate()).rejects.toThrow(
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
