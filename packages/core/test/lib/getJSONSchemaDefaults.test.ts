import type { OASDocument } from 'oas/types';

import { dereferenceAPI } from '@api/test-utils';
import nestedDefaultsSpec from '@api/test-utils/definitions/nested-defaults.json' with { type: 'json' };
import usptoSpec from '@readme/oas-examples/3.0/json/uspto.json' with { type: 'json' };
import parametersStyleSpec from '@readme/oas-examples/3.1/json/parameters-style.json' with { type: 'json' };
import Oas from 'oas';
import { describe, expect, it } from 'vitest';

import getJSONSchemaDefaults from '../../src/lib/getJSONSchemaDefaults.js';

// https://github.com/readmeio/api/issues/1200
const orderSpec = (customer: Record<string, unknown>, rootRequired: string[]) =>
  ({
    openapi: '3.0.0',
    info: { title: 'Example', version: '1.0' },
    servers: [{ url: 'https://api.example.com' }],
    paths: {
      '/orders': {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  additionalProperties: false,
                  required: rootRequired,
                  properties: { reference: { type: 'string' }, customer },
                },
              },
            },
          },
          responses: { 200: { description: 'ok' } },
        },
      },
    },
  }) as unknown as OASDocument;

const nestedCustomer = {
  type: 'object',
  required: ['address'],
  properties: {
    address: {
      type: 'object',
      required: ['city', 'country'],
      properties: { city: { type: 'string' }, country: { type: 'string', default: 'DE' } },
    },
  },
};

describe('#getJSONSchemaDefaults()', () => {
  it('should get defaults off an operation', async () => {
    const oas = await dereferenceAPI(structuredClone(usptoSpec) as OASDocument).then(Oas.init);

    const operation = oas.operation('/{dataset}/{version}/records', 'post');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema() ?? []);

    expect(defaults).toStrictEqual({
      path: {
        version: 'v1',
        dataset: 'oa_citations',
      },
      formData: {
        criteria: '*:*',
      },
    });
  });

  it('should be able to handle nested objects', async () => {
    const oas = await dereferenceAPI(structuredClone(nestedDefaultsSpec) as OASDocument).then(Oas.init);

    const operation = oas.operation('/pet', 'post');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema() ?? []);

    expect(defaults).toStrictEqual({
      body: {
        name: 'buster',
        category: {
          name: 'dog',
        },
      },
    });
  });

  describe('required objects nested below the root', () => {
    it('seeds them inside their parent, not at the root', () => {
      const oas = Oas.init(orderSpec(nestedCustomer, ['reference', 'customer']));
      const operation = oas.operation('/orders', 'post');
      const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema() ?? []);

      expect(defaults).toStrictEqual({
        body: {
          customer: {
            address: { country: 'DE' },
          },
        },
      });
    });

    it('leaves out a required child of an optional parent', () => {
      const oas = Oas.init(orderSpec(nestedCustomer, ['reference']));
      const operation = oas.operation('/orders', 'post');
      const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema() ?? []);

      expect(defaults).toStrictEqual({});
    });
  });

  it.todo('should be able to handle arrays with defaults');

  it('shouldnt add empty objects where there are no required defaults', async () => {
    const oas = await dereferenceAPI(structuredClone(parametersStyleSpec) as unknown as OASDocument).then(Oas.init);

    const operation = oas.operation('/cookies', 'get');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema() ?? []);

    expect(defaults).toStrictEqual({});
  });
});
