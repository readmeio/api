import type { HarRequest, Request } from '@readme/httpsnippet';
import type { Client } from '@readme/httpsnippet/dist/targets/targets';
import type { OASDocument } from 'oas/dist/rmoas.types';

import { readdirSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

import { HTTPSnippet, addTargetClient } from '@readme/httpsnippet';
import readme from '@readme/oas-examples/3.0/json/readme.json';
import openapiParser from '@readme/openapi-parser';
import rimraf from 'rimraf';
import { describe, afterEach, beforeEach, expect, it, vi } from 'vitest';

import client from '../src';

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
      addTargetClient('node', client as Client);
    } catch (err) {
      if (err.message !== 'The supplied custom target client already exists, please use a different key') {
        throw err;
      }
    }
  });

  it('should have info', () => {
    expect(client).toHaveProperty('info');
    expect(client.info).toStrictEqual({
      key: 'api',
      title: 'API',
      link: 'https://npm.im/api',
      description: 'Automatic SDK generation from an OpenAPI definition.',
    });
  });

  it('should error if no apiDefinitionUri was supplied', async () => {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api');
    }).toThrow(/must have an `apiDefinitionUri` option supplied/);
  });

  it('should error if no apiDefinition was supplied', async () => {
    const { har } = await getSnippetDataset('petstore');
    const snippet = new HTTPSnippet(har);

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://api.example.com/openapi.json',
      });
    }).toThrow(/must have an `apiDefinition` option supplied/);
  });

  // This test should fail because the url in the HAR is missing `/v1` in the path.
  it('should error if no matching operation was found in the apiDefinition', () => {
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

    expect(() => {
      snippet.convert('node', 'api', {
        apiDefinitionUri: 'https://api.example.com/openapi.json',
        apiDefinition: readme,
      });
    }).toThrow(/unable to locate a matching operation/i);
  });

  describe('snippets', () => {
    describe.each(SNIPPETS)('%s', snippet => {
      let mock: SnippetMock;
      let consoleStub;

      beforeEach(async () => {
        try {
          // Since we're doing integration testing with these snippets against the real `api`
          // library we should clear out the cache that it creates so our tests will run in a
          // cleanroom environment.
          rimraf.sync(path.join(__dirname, '../node_modules/.cache/api'));
        } catch (err) {
          // If we couldn't delete the `api` specs cache then it probably doesn't exist yet.
        }

        consoleStub = vi.spyOn(console, 'log').mockImplementation(() => {});

        mock = await getSnippetDataset(snippet);

        // `OpenAPIParser.validate()` updates the spec that's passed and we just want to validate
        // it here so we need to clone the object.
        const spec = JSON.parse(JSON.stringify(mock.definition));
        await openapiParser.validate(spec);
      });

      afterEach(() => {
        consoleStub.mockRestore();
      });

      it('should generate the expected snippet', async () => {
        const expected = await fs.readFile(path.join(DATASETS_DIR, snippet, 'output.js'), 'utf-8');

        const code = new HTTPSnippet(mock.har).convert('node', 'api', {
          apiDefinitionUri: `https://api.example.com/${snippet}.json`,
          apiDefinition: mock.definition,
        });

        expect(`${code}\n`).toStrictEqual(expected);
      });
    });
  });
});
