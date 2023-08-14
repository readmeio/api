import fs from 'fs';

import Oas from 'oas';
import { describe, beforeEach, it, expect } from 'vitest';

import prepareParams from '../../src/core/prepareParams';
import payloadExamples from '../__fixtures__/definitions/payloads.json';
import loadSpec from '../helpers/load-spec';

describe('#prepareParams', () => {
  let fileUploads: Oas;
  let readmeSpec: Oas;
  let usptoSpec: Oas;

  beforeEach(async () => {
    fileUploads = await loadSpec('@readme/oas-examples/3.0/json/file-uploads.json').then(Oas.init);
    await fileUploads.dereference();

    readmeSpec = await loadSpec('@readme/oas-examples/3.0/json/readme.json').then(Oas.init);
    await readmeSpec.dereference();

    usptoSpec = await loadSpec('@readme/oas-examples/3.0/json/uspto.json').then(Oas.init);
    await usptoSpec.dereference();
  });

  it('should throw an error if the operation has no parameters or request bodies and a body/metadata was supplied', async () => {
    const spec = await loadSpec('@readme/oas-examples/3.0/json/security.json').then(Oas.init);
    await spec.dereference();

    const operation = spec.operation('/apiKey', 'get');

    await expect(prepareParams(operation, {}, {})).rejects.toThrow(
      "You supplied metadata and/or body data for this operation but it doesn't have any documented parameters or request payloads. If you think this is an error please contact support for the API you're using.",
    );
  });

  it('should prepare nothing if nothing was supplied (and the operation has no required defaults)', async () => {
    const operation = readmeSpec.operation('/api-specification', 'post');

    await expect(prepareParams(operation)).resolves.toStrictEqual({});
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
    const operation = Oas.init(payloadExamples).operation('/primitiveBody', 'put');
    const body = 'Brie cheeseburger ricotta.';

    await expect(prepareParams(operation, body, {})).resolves.toStrictEqual({
      body,
    });
  });

  it('should prepare body if body is an array', async () => {
    const operation = Oas.init(payloadExamples).operation('/arraySchema', 'put');
    const body = [
      {
        name: 'Buster',
      },
    ];

    await expect(prepareParams(operation, body, {})).resolves.toStrictEqual({
      body,
    });
  });

  it('should ignore supplied body data if the request has no request body', async () => {
    const spec = await loadSpec('@readme/oas-examples/3.0/json/petstore.json').then(Oas.init);
    await spec.dereference();

    const operation = spec.operation('/pet/{petId}', 'get');

    const body = [{ name: 'Buster' }];
    const metadata = {
      petId: 1234,
    };

    await expect(prepareParams(operation, body, metadata)).resolves.toStrictEqual({
      path: { petId: 1234 },
    });
  });

  it('should ignore a supplied second parameter if its an empty object', async () => {
    const spec = await loadSpec('@readme/oas-examples/3.0/json/petstore.json').then(Oas.init);
    await spec.dereference();

    const operation = spec.operation('/pet/findByStatus', 'get');

    const metadata = {
      status: ['available'],
    };

    await expect(prepareParams(operation, metadata, {})).resolves.toStrictEqual({
      query: {
        status: ['available'],
      },
    });
  });

  describe('content types', () => {
    describe('application/x-www-form-urlencoded', () => {
      it('should support preparing formData payloads', async () => {
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

      // Since we're only sending `metadata` here we want to make sure that the path parameters in
      // it don't also get sent as `formData`.
      it('should should filter out metadata parameters from being sent twice', async () => {
        const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');

        const metadata = {
          dataset: 'v1',
          version: 'oa_citations',
        };

        await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
          formData: {
            criteria: '*:*',
          },
          path: {
            dataset: 'v1',
            version: 'oa_citations',
          },
        });
      });
    });

    describe('image/png', () => {
      it('should support a file path payload', async () => {
        const operation = fileUploads.operation('/anything/image-png', 'post');
        const body = `${__dirname}/../__fixtures__/owlbert.png`;

        const res = await prepareParams(operation, body);
        expect(res.body).toContain('data:image/png;name=owlbert.png;base64,');
        expect(res.files['owlbert.png']).toBeInstanceOf(Buffer);
      });

      it('should support a file stream payload', async () => {
        const operation = fileUploads.operation('/anything/image-png', 'post');
        const body = fs.createReadStream('./test/__fixtures__/owlbert.png');

        const res = await prepareParams(operation, body);
        expect(res.body).toContain('data:image/png;name=owlbert.png;base64,');
        expect(res.files['owlbert.png']).toBeInstanceOf(Buffer);
      });
    });

    describe('multipart/form-data', () => {
      it('should handle a multipart body when a property is a file path', async () => {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: require.resolve('@readme/oas-examples/3.0/json/readme.json'),
        };

        const res = await prepareParams(operation, body);
        expect(res.body.documentFile).toContain('data:application/json;name=readme.json;base64,');
        expect(res.files['readme.json']).toBeInstanceOf(Buffer);
      });

      it('should handle when the file path is relative', async () => {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: './test/__fixtures__/owlbert.png',
        };

        const res = await prepareParams(operation, body);
        expect(res.body.documentFile).toContain('data:image/png;name=owlbert.png;base64,');
        expect(res.files['owlbert.png']).toBeInstanceOf(Buffer);
      });

      it('should handle a multipart body when a property is a file stream', async () => {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: fs.createReadStream('./test/__fixtures__/owlbert.png'),
        };

        const res = await prepareParams(operation, body);
        expect(res.body.documentFile).toContain('data:image/png;name=owlbert.png;base64,');
        expect(res.files['owlbert.png']).toBeInstanceOf(Buffer);
      });
    });
  });

  describe('file handling', () => {
    it('should reject unknown file handlers', async () => {
      const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
      const body = {
        documentFile: ['this is not a file handler'],
      };

      await expect(prepareParams(operation, body)).rejects.toThrow(
        'The data supplied for the `documentFile` request body parameter is not a file handler that we support.',
      );
    });

    // This test sounds weird but we don't have a great way to know if a string we have is a path
    // to a file that doesn't exist or the string contents of a file, so we're just passing along
    // file paths that don't exist right now.
    it("should not reject files that don't exist", async () => {
      const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
      const body = {
        documentFile: './test/__fixtures__/owlbert.jpg',
      };

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        body: {
          documentFile: './test/__fixtures__/owlbert.jpg',
        },
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
      const operation = Oas.init(payloadExamples).operation('/arraySchema', 'put');
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
          criteria: '*:*',
          randomUnknownParameter: true,
        },
      });
    });

    it('should prepare metadata if less than 25% of the supplied argument lines up with known parameters', async () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        randomUnknownParameter: true,
        randomUnknownParameter2: true,
        randomUnknownParameter3: true,
        randomUnknownParameter4: true,
        version: 'v1', // This a known parameter, but the others aren't and should be treated as body payload data.
      };

      await expect(prepareParams(operation, body)).resolves.toStrictEqual({
        formData: {
          criteria: '*:*',
          randomUnknownParameter: true,
          randomUnknownParameter2: true,
          randomUnknownParameter3: true,
          randomUnknownParameter4: true,
          version: 'v1',
        },
        path: {
          dataset: 'oa_citations',
          version: 'v1',
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

  describe('parameter types', () => {
    let parameterStyle;

    beforeEach(async () => {
      parameterStyle = await loadSpec('@readme/oas-examples/3.1/json/parameters-style.json').then(Oas.init);
      await parameterStyle.dereference();
    });

    it.each([
      ['cookies', '/cookies', 'get', 'cookie'],
      ['headers', '/anything/headers', 'get', 'header'],
      ['query', '/anything/query', 'get', 'query'],
    ])('should support %s', async (_, path, method, paramName) => {
      const operation = parameterStyle.operation(path, method);
      const metadata = {
        primitive: 'buster',
      };

      await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
        [paramName]: {
          primitive: 'buster',
        },
      });
    });

    it('should support matching on case-insensitive header parameters', async () => {
      const operation = parameterStyle.operation('/anything/headers', 'get');
      const metadata = {
        PrimItive: 'buster',
      };

      await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
        header: {
          primitive: 'buster',
        },
      });
    });

    describe('`accept` header overrides', () => {
      it('should support supplying an `accept` header parameter', async () => {
        const operation = parameterStyle.operation('/anything/headers', 'get');
        const metadata = {
          primitive: 'buster',
          accept: 'application/json',
        };

        await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
          header: {
            primitive: 'buster',
            accept: 'application/json',
          },
        });
      });

      it('should support supplying a case-insensitive `accept` header parameter', async () => {
        const operation = parameterStyle.operation('/anything/headers', 'get');
        const metadata = {
          primitive: 'buster',
          ACCept: 'application/json',
        };

        await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
          header: {
            primitive: 'buster',
            accept: 'application/json',
          },
        });
      });

      it('should support supplying **only** an `accept` header parameter', async () => {
        const operation = parameterStyle.operation('/anything/headers', 'get');
        const metadata = {
          accept: 'application/json',
        };

        await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
          header: {
            accept: 'application/json',
          },
        });
      });
    });

    it('should support path parameters', async () => {
      const operation = parameterStyle.operation('/anything/path/{primitive}/{array}/{object}', 'get');
      const metadata = {
        primitive: 'buster',
        array: ['buster'],
        object: {
          name: 'buster',
          description: 'the dog',
        },
      };

      await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
        path: {
          primitive: 'buster',
          array: ['buster'],
          object: { name: 'buster', description: 'the dog' },
        },
      });
    });
  });

  describe('defaults', () => {
    it('should prefill defaults for required body parameters if not supplied', async () => {
      const oas = await loadSpec('../__fixtures__/definitions/nested-defaults.json').then(Oas.init);
      await oas.dereference();

      const operation = oas.operation('/pet', 'post');
      await expect(prepareParams(operation, { id: 404 })).resolves.toStrictEqual({
        body: {
          id: 404,
          category: { name: 'dog' },
          name: 'buster',
        },
      });
    });

    it('should prefill defaults for required body parameters (on formData-used operations) if not supplied', async () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const metadata = {
        version: 'v2',
        dataset: 'dog_treats',
      };

      await expect(prepareParams(operation, metadata)).resolves.toStrictEqual({
        formData: {
          criteria: '*:*',
        },
        path: {
          version: 'v2',
          dataset: 'dog_treats',
        },
      });
    });

    it('should prefill defaults for required metadata parameters if not supplied', async () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');

      await expect(prepareParams(operation)).resolves.toStrictEqual({
        formData: {
          criteria: '*:*',
        },
        path: {
          version: 'v1',
          dataset: 'oa_citations',
        },
      });
    });

    it('should not override any user-provided data with defaults', async () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = { criteria: 'query:dogs' };
      const metadata = { version: 'v2', dataset: 'dog_treats' };

      await expect(prepareParams(operation, body, metadata)).resolves.toStrictEqual({
        formData: {
          criteria: 'query:dogs',
        },
        path: {
          version: 'v2',
          dataset: 'dog_treats',
        },
      });
    });
  });
});
