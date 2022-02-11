import getJSONSchemaDefaults from '../../src/lib/getJSONSchemaDefaults';
import Oas from 'oas';

test('should get defaults off an operation', async () => {
  const oas = await import('@readme/oas-examples/3.0/json/uspto.json').then(Oas.init);
  await oas.dereference();

  const operation = oas.operation('/{dataset}/{version}/records', 'post');
  const defaults = getJSONSchemaDefaults(operation.getParametersAsJsonSchema());

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

test('should be able to handle nested objects', async () => {
  const oas = await import('@readme/oas-examples/3.0/json/petstore.json')
    .then((spec: any) => {
      /* eslint-disable no-param-reassign */
      spec.components.schemas.Pet.required.push('category');
      spec.components.schemas.Pet.properties.name.default = 'buster';

      spec.components.schemas.Category.required = ['name'];
      spec.components.schemas.Category.properties.name.default = 'dog';
      /* eslint-enable no-param-reassign */

      return spec;
    })
    .then(Oas.init);

  await oas.dereference();

  const operation = oas.operation('/pet', 'post');
  const defaults = getJSONSchemaDefaults(operation.getParametersAsJsonSchema());

  expect(defaults).toStrictEqual({
    body: {
      name: 'buster',
      category: {
        name: 'dog',
      },
    },
  });
});

test.todo('should be able to handle arrays with defaults');

test('shouldnt add empty objects where there are no required defaults', async () => {
  const oas = await import('@readme/oas-examples/3.1/json/parameters-style.json').then(Oas.init);
  await oas.dereference();

  const operation = oas.operation('/cookies', 'get');
  const defaults = getJSONSchemaDefaults(operation.getParametersAsJsonSchema());

  expect(defaults).toStrictEqual({});
});
