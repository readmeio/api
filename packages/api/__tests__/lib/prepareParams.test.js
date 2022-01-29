const fs = require('fs');
const Oas = require('oas').default;
const prepareParams = require('../../src/lib/prepareParams');

const payloadExamples = require('../__fixtures__/payloads.oas.json');

console.logx = obj => {
  console.log(require('util').inspect(obj, false, null, true));
};

describe('#prepareParams', () => {
  let fileUploads;
  let readmeSpec;
  let usptoSpec;

  beforeAll(async () => {
    fileUploads = new Oas(require('@readme/oas-examples/3.0/json/file-uploads.json'));
    await fileUploads.dereference();

    readmeSpec = new Oas(require('@readme/oas-examples/3.0/json/readme.json'));
    await readmeSpec.dereference();

    usptoSpec = new Oas(require('@readme/oas-examples/3.0/json/uspto.json'));
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

    describe('application/octet-stream', () => {
      it.skip('should handle when a property is a file path', async () => {
        const operation = fileUploads.operation('/anything/image-png', 'post');
        const body = `${__dirname}/../__fixtures__/owlbert.png`;

        const res = await prepareParams(operation, body);

        console.logx({ body, res });
      });
    });

    describe('multipart/form-data', () => {
      it.only('should handle a multipart body when a property is a file path', async () => {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: require.resolve('@readme/oas-examples/3.0/json/readme.json'),
        };

        await expect(prepareParams(operation, body)).resolves.toStrictEqual({
          body: {
            documentFile: expect.stringContaining('data:application/json;name=readme.json;base64,'),
          },
          files: {
            'readme.json': expect.any(Buffer),
          },
        });
      });

      it('should handle when the file path is relative', async () => {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: './__tests__/__fixtures__/owlbert.png',
        };

        await expect(prepareParams(operation, body)).resolves.toStrictEqual({
          body: {
            documentFile: expect.stringContaining('data:image/png;name=owlbert.png;base64,'),
          },
          files: {
            'owlbert.png': expect.any(Buffer),
          },
        });
      });

      it('should handle a multipart body when a property is a file stream', async () => {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: fs.createReadStream('./__tests__/__fixtures__/owlbert.png'),
        };

        await expect(prepareParams(operation, body)).resolves.toStrictEqual({
          body: {
            documentFile: expect.stringContaining('data:image/png;name=owlbert.png;base64,'),
          },
          files: {
            'owlbert.png': expect.any(Buffer),
          },
        });
      });
    });
  });

  describe('supplying just a body or metadata', () => {
    it('should handle if supplied is a body', async () => {
      const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
      const body = {
        documentFile: 'this is the contents of a document',
      };

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        body,
      });
    });

    it('should prepare a body if supplied is primitive', async () => {
      const operation = fileUploads.operation('/anything/image-png', 'post');
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
