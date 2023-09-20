import loadSpec from '@api/test-utils/load-spec';
import Oas from 'oas';
import { describe, it, expect } from 'vitest';

import getJSONSchemaDefaults from '../../src/lib/getJSONSchemaDefaults.js';

describe('#getJSONSchemaDefaults()', () => {
  it('should get defaults off an operation', async () => {
    const oas = await loadSpec('@readme/oas-examples/3.0/json/uspto.json').then(Oas.init);
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
    const oas = await loadSpec('@api/test-utils/definitions/nested-defaults.json').then(Oas.init);
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
    const oas = await loadSpec('@readme/oas-examples/3.1/json/parameters-style.json').then(Oas.init);
    await oas.dereference();

    const operation = oas.operation('/cookies', 'get');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJSONSchema());

    expect(defaults).toStrictEqual({});
  });
});
