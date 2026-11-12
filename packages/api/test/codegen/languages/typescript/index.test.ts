import type { OASDocument } from 'oas/types';
import type { MockInstance } from 'vitest';

import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import { dereferenceAPI, responses as mockResponse } from '@api/test-utils';
import circular from '@readme/oas-examples/3.0/json/circular.json' with { type: 'json' };
import { execa } from 'execa';
import nock from 'nock';
import Oas from 'oas';
import uniqueTempDir from 'unique-temp-dir';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SupportedLanguages } from '../../../../src/codegen/factory.js';
import TSGenerator from '../../../../src/codegen/languages/typescript/index.js';
import * as packageInfo from '../../../../src/packageInfo.js';
import Storage from '../../../../src/storage.js';

function loadSpec(spec: string): Promise<OASDocument> {
  return import(spec).then(({ default: data }) => JSON.stringify(data)).then(JSON.parse);
}

const commentBreakoutMarker = '__readme_cx4045_codegen_comment_breakout__';

function commentBreakout(label: string) {
  return `${label} */ globalThis.${commentBreakoutMarker} = true; /*`;
}

function definitionWithInfo(info: OASDocument['info']): OASDocument {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Example API',
      version: '1.0.0',
      ...info,
    },
    paths: {
      '/ping': {
        get: {
          operationId: 'ping',
          responses: {
            '200': {
              description: 'ok',
            },
          },
        },
      },
    },
  };
}

function generateSdk(definition: OASDocument) {
  const ts = new TSGenerator(Oas.init(definition), '../openapi.json', 'comment-escape');
  return ts.generate();
}

async function importGeneratedSdk(definition: OASDocument, files: Record<string, string>) {
  const dir = path.join(__dirname, `.tmp-comment-escape-${randomUUID()}`);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'openapi.json'), JSON.stringify(definition));
  await Promise.all(
    Object.entries(files).map(async ([filename, contents]) => {
      const filePath = path.join(dir, filename);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, contents);
    }),
  );

  try {
    return await import(path.join(dir, 'src/index.ts')).then(mod => mod.default);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
}

function assertSDKFixture(file: string, fixture: string) {
  return async () => {
    const oas = await loadSpec(require.resolve(file))
      .then(def => dereferenceAPI(structuredClone(def) as unknown as OASDocument))
      .then(Oas.init);

    const ts = new TSGenerator(oas, file, fixture);
    const actualFiles = await ts.generate();

    // Determine if the generated code matches what we've got in our fixture.
    const dir = path.resolve(path.join(__dirname, '..', '..', '..', '..', '..', 'test-utils', 'sdks', fixture));
    const expectedFiles = await fs
      .readdir(dir, { recursive: true })
      .then(files => {
        files.sort();

        // The `src/schemas` directory comes back to us from `fs.readdir` but because we're doing a
        // recursive lookup on that we also get `src/schemas/<schemaName>`. We only care about the
        // schema files themselves, not the general directory, so we need to exclude this from our
        // list of expected files.
        //
        // And if there happens to be a `dist/` directory in the SDK directory we can ignore it too.
        return files.filter(f => !['src', 'src/schemas'].includes(f) && !f.startsWith('dist'));
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

    // creates new files if they don't exist
    if (sortedActualFiles.length > expectedFiles.length && process.env.UPDATE_FIXTURES) {
      await Promise.all(
        sortedActualFiles.map(actualFileName => {
          if (!expectedFiles.includes(actualFileName)) {
            const actualFilePath = path.join(dir, actualFileName);
            // oxlint-disable-next-line no-console -- Debug when regenerating fixtures.
            console.info('[creating sdk fixture]', actualFilePath);
            return fs.writeFile(actualFilePath, actualFiles[actualFileName]);
          }
          return true;
        }),
      );
    } else {
      expect(sortedActualFiles).toStrictEqual(expectedFiles);
    }

    // Assert that each generated file is the same as in the fixture.
    await Promise.all(
      expectedFiles.map(filename => {
        const actual = actualFiles[filename];
        const expectedFilePath = path.join(dir, filename);

        return fs.readFile(expectedFilePath, 'utf8').then(async expected => {
          if (actual !== expected && process.env.UPDATE_FIXTURES) {
            // oxlint-disable-next-line no-console -- Debug when regenerating fixtures.
            console.info('[sdk fixture updated]', expectedFilePath);
            await fs.writeFile(expectedFilePath, actual);
            return;
          }

          expect(actual, `expected \`${filename}\` to match fixture`).toBe(expected);
        });
      }),
    );

    // Make sure that we can load the SDK without any TS compilation errors.
    const sdk = await import(`${dir}/src/index.ts`).then(r => r.default);
    expect(sdk.constructor.name).toBe('SDK');
  };
}

describe('typescript', () => {
  let packageInfoSpy: MockInstance;

  beforeEach(() => {
    // @ts-expect-error deliberately setting this const to another value
    packageInfoSpy = vi.spyOn(packageInfo, 'PACKAGE_VERSION', 'get').mockReturnValue('7.0.0-mock');
    vi.setSystemTime(new Date('2023-10-25'));
    Storage.setStorageDir(uniqueTempDir());
  });

  afterEach(async () => {
    packageInfoSpy.mockReset();
    vi.useRealTimers();
    await Storage.reset();
  });

  describe('#install', () => {
    it('should install the required packages', async () => {
      const logger = vi.fn<() => void>();

      const file = require.resolve('@readme/oas-examples/3.0/json/petstore.json');
      const oas = await loadSpec(file)
        .then(def => dereferenceAPI(structuredClone(def) as unknown as OASDocument))
        .then(Oas.init);

      const storage = new Storage(file, SupportedLanguages.JS, 'petstore');
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
    }, 20_000);
  });

  describe('#compile', () => {
    it('should generate an sdk', assertSDKFixture('@api/test-utils/definitions/simple.json', 'simple'));

    it(
      'should be able to generate valid TS when a body is optional but metadata isnt',
      assertSDKFixture('@api/test-utils/definitions/optional-payload.json', 'optional-payload'),
    );

    it('should work against the petstore', assertSDKFixture('@readme/oas-examples/3.0/json/petstore.json', 'petstore'));

    it(
      'should work against metrotransit',
      assertSDKFixture('@api/test-utils/definitions/metrotransit.json', 'metrotransit'),
    );

    it('should work against our OAS', assertSDKFixture('@readme/oas-examples/3.0/json/readme-legacy.json', 'readme'));

    // This SDK only has an `index.ts` as it has no schemas.
    it(
      'should handle some quirky `operationId` cases',
      assertSDKFixture('@api/test-utils/definitions/operationid-quirks.json', 'operationid-quirks'),
    );

    it(
      'should handle `title` props that start with a number',
      assertSDKFixture('@api/test-utils/definitions/response-title-quirks.json', 'response-title-quirks'),
    );

    it(
      'should work against a very large API definition that has `default` responses',
      { timeout: 20_000 },
      assertSDKFixture('@readme/oas-examples/3.0/json/star-trek.json', 'star-trek'),
    );

    it(
      'should handle an api that has discriminators and no operation ids',
      assertSDKFixture('@api/test-utils/definitions/alby.json', 'alby'),
    );

    describe('integration', () => {
      it('should be able to make an API request', async () => {
        const sdk = await import('../../../../../test-utils/sdks/simple/src/index.js').then(r => r.default);
        nock('http://petstore.swagger.io')
          .get('/v2/pet/findByStatus?status=available')
          .reply(mockResponse.searchParams);

        await sdk.findPetsByStatus({ status: ['available'] }).then(({ data, status, headers, res }) => {
          expect(data).toBe('/v2/pet/findByStatus?status=available');
          expect(status).toBe(200);
          expect(headers.constructor.name).toBe('Headers');
          expect(res.constructor.name).toBe('Response');
        });
      });

      it('should be able to make an API request with an `accept` header`', async () => {
        const sdk = await import('../../../../../test-utils/sdks/simple/src/index.js').then(r => r.default);
        nock('http://petstore.swagger.io').get('/v2/pet/findByStatus?status=available').reply(mockResponse.headers);

        await sdk
          .findPetsByStatus({ status: ['available'], accept: 'application/xml' })
          .then(({ data, status, headers, res }) => {
            expect(data).toHaveProperty('accept', 'application/xml');
            expect(status).toBe(200);
            expect(headers.constructor.name).toBe('Headers');
            expect(res.constructor.name).toBe('Response');
          });
      });
    });

    describe('jsdoc comment delimiters', () => {
      afterEach(() => {
        Reflect.deleteProperty(globalThis, commentBreakoutMarker);
      });

      it('should escape comment delimiters in OpenAPI metadata copied into JSDoc tags', async () => {
        const definition = definitionWithInfo({
          contact: {
            name: commentBreakout('contact-name'),
            url: `https://example.com/${commentBreakout('contact-url')}`,
          },
          termsOfService: `https://example.com/${commentBreakout('terms')}`,
          license: {
            name: commentBreakout('license-name'),
            url: `https://example.com/${commentBreakout('license-url')}`,
          },
        });

        const files = await generateSdk(definition);
        const index = files['src/index.ts'];

        // User-supplied `*/` is escaped, so the docblock has a single terminator.
        expect(index.match(/\*\//g)).toStrictEqual(['*/']);
        expect(index).toContain('contact-name *\\/');
        expect(index).toContain('contact-url *\\/');
        expect(index).toContain('terms *\\/');
        expect(index).toContain('license-name *\\/');
        expect(index).toContain('license-url *\\/');
        expect(index).toContain('/\\*');
        expect(index).not.toContain('contact-name */');

        const sdk = await importGeneratedSdk(definition, files);
        expect(sdk.constructor.name).toBe('SDK');
        expect(Reflect.get(globalThis, commentBreakoutMarker)).toBeUndefined();
      });

      it('should still emit benign OpenAPI metadata into JSDoc tags', async () => {
        const definition = definitionWithInfo({
          contact: {
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            url: 'https://example.com/contact',
          },
          termsOfService: 'https://example.com/terms',
          license: {
            name: 'Proprietary Example',
            url: 'https://example.com/license',
          },
        });

        const files = await generateSdk(definition);
        const index = files['src/index.ts'];

        expect(index).toContain('@author Ada Lovelace <ada@example.com>');
        expect(index).toContain('@see {@link https://example.com/contact}');
        expect(index).toContain('@see {@link https://example.com/terms Terms of Service}');
        expect(index).toContain('@license Proprietary Example');
        expect(index).toContain('@see {@link https://example.com/license}');
        expect(index.match(/\*\//g)).toStrictEqual(['*/']);

        const sdk = await importGeneratedSdk(definition, files);
        expect(sdk.constructor.name).toBe('SDK');
        expect(Reflect.get(globalThis, commentBreakoutMarker)).toBeUndefined();
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
        const oas = await dereferenceAPI(structuredClone(circular) as unknown as OASDocument).then(Oas.init);

        expect(() => {
          return new TSGenerator(oas, 'circular', './circular.json');
        }).toThrow(
          'Sorry, this library does not yet support generating an SDK for an OpenAPI definition that contains circular references.',
        );
      });
    });
  });
});
