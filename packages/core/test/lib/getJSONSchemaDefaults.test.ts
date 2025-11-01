import nestedDefaultsSpec from '@api/test-utils/definitions/nested-defaults.json' with { type: 'json' };
import usptoSpec from '@readme/oas-examples/3.0/json/uspto.json' with { type: 'json' };
import parametersStyleSpec from '@readme/oas-examples/3.1/json/parameters-style.json' with { type: 'json' };
import Oas from 'oas';
import { describe, expect, it } from 'vitest';

import getJSONSchemaDefaults from '../../src/lib/getJSONSchemaDefaults.js';

describe('#getJSONSchemaDefaults()', () => {
  it('should get defaults off an operation', async () => {
    const oas = Oas.init(structuredClone(usptoSpec));
    await oas.dereference();

    const operation = oas.operation('/{dataset}/{version}/records', 'post');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema());

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
    const oas = Oas.init(structuredClone(nestedDefaultsSpec));
    await oas.dereference();

    const operation = oas.operation('/pet', 'post');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema());

    expect(defaults).toStrictEqual({
      body: {
        name: 'buster',
        category: {
          name: 'dog',
        },
      },
    });
  });

  it.todo('should be able to handle arrays with defaults');

  it('shouldnt add empty objects where there are no required defaults', async () => {
    const oas = Oas.init(structuredClone(parametersStyleSpec));
    await oas.dereference();

    const operation = oas.operation('/cookies', 'get');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema());

    expect(defaults).toStrictEqual({});
  });
});
