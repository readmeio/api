const fs = require('fs');
const Oas = require('oas').default;
const readmeExample = require('@readme/oas-examples/3.0/json/readme.json');
const usptoExample = require('@readme/oas-examples/3.0/json/uspto.json');
const payloadExamples = require('../__fixtures__/payloads.oas.json');

const prepareParams = require('../../src/lib/prepareParams');

describe('#prepareParams', () => {
  let readmeSpec;
  let usptoSpec;

  beforeAll(async () => {
    readmeSpec = new Oas(readmeExample);
    await readmeSpec.dereference();

    usptoSpec = new Oas(usptoExample);
    await usptoSpec.dereference();
  });

  it('should prepare nothing if nothing was supplied', async () => {
    const operation = readmeSpec.operation('/api-specification', 'post');

    await expect(prepareParams(operation)).resolves.toStrictEqual({});
    await expect(prepareParams(operation, null, null)).resolves.toStrictEqual({});
    await expect(prepareParams(operation, [], [])).resolves.toStrictEqual({});
    await expect(prepareParams(operation, {}, {})).resolves.toStrictEqual({});
  });

  it('should prepare body and metadata when both are supplied', async () => {
    const operation = readmeSpec.operation('/api-specification', 'post');
    const body = {
      spec: 'this is the contents of an api specification',
    };

    const metadata = {
      'x-readme-version': '1.0',
    };

    await expect(prepareParams(operation, body, metadata)).resolves.toStrictEqual({
      body: {
        spec: 'this is the contents of an api specification',
      },
      header: {
        'x-readme-version': '1.0',
      },
    });
  });

  it('should prepare body if body is a primitive', async () => {
    const operation = new Oas(payloadExamples).operation('/primitiveBody', 'put');
    const body = 'Brie cheeseburger ricotta.';

    await expect(prepareParams(operation, body, {})).resolves.toStrictEqual({
      body,
    });
  });

  it('should prepare body if body is an array', async () => {
    const operation = new Oas(payloadExamples).operation('/arraySchema', 'put');
    const body = [
      {
        name: 'Buster',
      },
    ];

    await expect(prepareParams(operation, body, {})).resolves.toStrictEqual({
      body,
    });
  });

  describe('content types', () => {
    it('should handle bodies when the content type is `application/x-www-form-urlencoded`', async () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        criteria: '*:*',
      };

      const metadata = {
        dataset: 'v1',
        version: 'oa_citations',
      };

      await expect(prepareParams(operation, body, metadata)).resolves.toStrictEqual({
        path: {
          dataset: 'v1',
          version: 'oa_citations',
        },
        formData: {
          criteria: '*:*',
        },
      });
    });

    describe('multipart/form-data', () => {
      it('should handle a multipart body when a property is a file path', async () => {
        const operation = readmeSpec.operation('/api-specification', 'post');
        const body = {
          spec: require.resolve('@readme/oas-examples/3.0/json/readme.json'),
        };

        const params = await prepareParams(operation, body);
        expect(params.body.spec).toContain('data:application/json;name=readme.json;base64,');
      });

      it('should handle when the file path is relative', async () => {
        const operation = readmeSpec.operation('/api-specification', 'post');
        const body = {
          spec: './__tests__/__fixtures__/owlbert.png',
        };

        const params = await prepareParams(operation, body);
        expect(params.body.spec).toContain('data:image/png;name=owlbert.png;base64,');
      });

      it('should handle a multipart body when a property is a file stream', async () => {
        const operation = readmeSpec.operation('/api-specification', 'post');
        const body = {
          spec: fs.createReadStream(require.resolve('@readme/oas-examples/3.0/json/readme.json')),
        };

        const params = await prepareParams(operation, body);
        expect(params.body.spec).toContain('data:application/json;name=readme.json;base64,');
      });
    });
  });

  describe('supplying just a body or metadata', () => {
    it('should handle if supplied is a body', async () => {
      const operation = readmeSpec.operation('/api-specification', 'post');
      const body = {
        spec: 'this is the contents of an api specification',
      };

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        body,
      });
    });

    it('should prepare a body if supplied is primitive', async () => {
      const operation = readmeSpec.operation('/api-specification', 'post');
      const body = 'this is a primitive value';

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        body,
      });
    });

    it('should prepare just a body if supplied argument is an array', async () => {
      const operation = new Oas(payloadExamples).operation('/arraySchema', 'put');
      const body = [
        {
          name: 'Buster',
        },
      ];

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        body,
      });
    });

    it('should prepare metadata if more than 25% of the supplied argument lines up with known parameters', async () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        version: 'v1',
        dataset: 'oa_citations',
        randomUnknownParameter: true,
      };

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        path: {
          version: 'v1',
          dataset: 'oa_citations',
        },
        formData: {
          version: 'v1',
          dataset: 'oa_citations',
          randomUnknownParameter: true,
        },
      });
    });

    it('should prepare metadata if less than 25% of the supplied argument lines up with known parameters', async () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        version: 'v1', // This a known parameter, but the others aren't and should be treated as body payload data.
        randomUnknownParameter: true,
        randomUnknownParameter2: true,
        randomUnknownParameter3: true,
        randomUnknownParameter4: true,
      };

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        formData: {
          version: 'v1',
          randomUnknownParameter: true,
          randomUnknownParameter2: true,
          randomUnknownParameter3: true,
          randomUnknownParameter4: true,
        },
      });
    });

    it('should prepare just metadata if supplied is metadata', async () => {
      const operation = readmeSpec.operation('/api-specification', 'post');
      const metadata = {
        'x-readme-version': '1.0',
      };

      await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
        header: {
          'x-readme-version': '1.0',
        },
      });
    });
  });

  it.todo(`should be able to handle parameters when they're defined as common parameters`);
});
