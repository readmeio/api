import { expect } from 'chai';
import getJSONSchemaDefaults from '../../src/core/getJSONSchemaDefaults';
import Oas from 'oas';

describe('#getJSONSchemaDefaults()', function () {
  it('should get defaults off an operation', async function () {
    const oas = await import('@readme/oas-examples/3.0/json/uspto.json').then(Oas.init);
    await oas.dereference();

    const operation = oas.operation('/{dataset}/{version}/records', 'post');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJsonSchema());

    expect(defaults).to.deep.equal({
      path: {
        version: 'v1',
        dataset: 'oa_citations',
      },
      formData: {
        criteria: '*:*',
      },
    });
  });

  it('should be able to handle nested objects', async function () {
    const oas = await import('../__fixtures__/nested-defaults.oas.json').then(Oas.init);
    await oas.dereference();

    const operation = oas.operation('/pet', 'post');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJsonSchema());

    expect(defaults).to.deep.equal({
      body: {
        name: 'buster',
        category: {
          name: 'dog',
        },
      },
    });
  });

  it.skip('should be able to handle arrays with defaults');

  it('shouldnt add empty objects where there are no required defaults', async function () {
    const oas = await import('@readme/oas-examples/3.1/json/parameters-style.json').then(Oas.init);
    await oas.dereference();

    const operation = oas.operation('/cookies', 'get');
    const defaults = getJSONSchemaDefaults(operation.getParametersAsJsonSchema());

    expect(defaults).to.deep.equal({});
  });
});
