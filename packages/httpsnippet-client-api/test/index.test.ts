import type { HarRequest, Request } from '@readme/httpsnippet';
import type { ClientPlugin } from '@readme/httpsnippet/targets';
import type { OASDocument } from 'oas/types';

import { readdirSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

import { HTTPSnippet, addClientPlugin } from '@readme/httpsnippet';
import readme from '@readme/oas-examples/3.0/json/readme.json';
import openapiParser from '@readme/openapi-parser';
import { describe, beforeEach, expect, it } from 'vitest';

import plugin from '../src/index.js';

const DATASETS_DIR = path.join(__dirname, '__datasets__');
const SNIPPETS = readdirSync(DATASETS_DIR);

export interface SnippetMock {
  definition: OASDocument;
  har: HarRequest;
}

function getSnippetDataset(snippet): Promise<SnippetMock> {
  return import(path.join(DATASETS_DIR, snippet, 'index')).then(r => r.default);
}

describe('httpsnippet-client-api', () => {
  beforeEach(() => {
    try {
      addClientPlugin(plugin as ClientPlugin);
    } catch (err) {
      if (err.message !== 'The supplied custom target client already exists, please use a different key') {
        throw err;
      }
    }
  });

  it('should have info', () => {
    expect(plugin).toHaveProperty('target', 'node');
    expect(plugin.client).toHaveProperty('info');
    expect(plugin.client.info).toStrictEqual({
      key: 'api',
      title: 'API',
      link: 'https://npm.im/api',
      description: 'Automatic SDK generation from an OpenAPI definition.',
      extname: '.js',
      installation: 'npx api install {packageName}',
    });
  });

  it('should error if no `api` config was supplied', async () => {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    await expect(snippet.convert('node', 'api')).rejects.toThrow(/must have an `api` config supplied/);
    await expect(snippet.convert('node', 'api', {})).rejects.toThrow(/must have an `api` config supplied/);
  });

  it('should error if no `api.definition` was supplied', async () => {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    await expect(
      snippet.convert('node', 'api', {
        api: {
          registryURI: '@developers/v2.0#17273l2glm9fq4l5',
        },
      }),
    ).rejects.toThrow(/must have an `api.definition` option supplied/);
  });

  it('should error if no `api.registryURI` was supplied', async () => {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    await expect(
      snippet.convert('node', 'api', {
        api: {
          definition: readme,
        },
      }),
    ).rejects.toThrow(/must have an `api.registryURI` option supplied/);
  });

  // This test should fail because the url in the HAR is missing `/v1` in the path.
  it('should error if no matching operation was found in the supplied API definition', async () => {
    const har = {
      httpVersion: 'HTTP/1.1',
      method: 'GET',
      queryString: [
        { name: 'perPage', value: '10' },
        { name: 'page', value: '1' },
      ],
      url: 'https://dash.readme.com/api/api-specification',
    };

    const snippet = new HTTPSnippet(har as Request);

    await expect(
      snippet.convert('node', 'api', {
        api: {
          definition: readme,
          registryURI: '@developers/v2.0#17273l2glm9fq4l5',
        },
      }),
    ).rejects.toThrow(/unable to locate a matching operation/i);
  });

  describe('snippets', () => {
    describe.each(SNIPPETS)('%s', snippet => {
      let mock: SnippetMock;

      beforeEach(async () => {
        mock = await getSnippetDataset(snippet);

        // `OpenAPIParser.validate()` updates the spec that's passed and we just want to validate
        // it here so we need to clone the object.
        const spec = JSON.parse(JSON.stringify(mock.definition));
        await openapiParser.validate(spec);
      });

      it('should generate the expected snippet', async () => {
        const expected = await fs.readFile(path.join(DATASETS_DIR, snippet, 'output.js'), 'utf-8');

        const code = await new HTTPSnippet(mock.har).convert('node', 'api', {
          api: {
            definition: mock.definition,
            registryURI: `@${snippet}/v2.0#17273l2glm9fq4l5`,
          },
        });

        expect(`${code}\n`).toStrictEqual(expected);
      });
    });

    describe('custom variable names', () => {
      it('should support custom SDK variable names', async () => {
        const mock = await getSnippetDataset('petstore');

        const code = await new HTTPSnippet(mock.har).convert('node', 'api', {
          api: {
            definition: mock.definition,
            packageName: 'developers',
            registryURI: '@developers/v2.0#17273l2glm9fq4l5',
            variableName: 'developersSDK',
          },
        });

        expect(code).toStrictEqual(`import developersSDK from '@api/developers';

developersSDK.auth('123');
developersSDK.findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));`);
      });

      it('should make an unsafe variable name safe', async () => {
        const mock = await getSnippetDataset('petstore');

        const code = await new HTTPSnippet(mock.har).convert('node', 'api', {
          api: {
            definition: mock.definition,
            packageName: 'metro-transit',
            registryURI: '@metro-transit/v2.0#17273l2glm9fq4l5',
            variableName: 'metro-transit-SDK',
          },
        });

        expect(code).toStrictEqual(`import metroTransitSDK from '@api/metro-transit';

metroTransitSDK.auth('123');
metroTransitSDK.findPetsByStatus({status: 'available', accept: 'application/xml'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));`);
      });
    });
  });
});
