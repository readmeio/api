import fs from 'fs';

import { assert, expect } from 'chai';
import Oas from 'oas';

import prepareParams from '../../src/core/prepareParams';
import payloadExamples from '../__fixtures__/definitions/payloads.json';
import loadSpec from '../helpers/load-spec';

describe('#prepareParams', function () {
  let fileUploads: Oas;
  let readmeSpec: Oas;
  let usptoSpec: Oas;

  beforeEach(async function () {
    fileUploads = await loadSpec('@readme/oas-examples/3.0/json/file-uploads.json').then(Oas.init);
    await fileUploads.dereference();

    readmeSpec = await loadSpec('@readme/oas-examples/3.0/json/readme.json').then(Oas.init);
    await readmeSpec.dereference();

    usptoSpec = await loadSpec('@readme/oas-examples/3.0/json/uspto.json').then(Oas.init);
    await usptoSpec.dereference();
  });

  it('should throw an error if the operation has no parameters or request bodies and a body/metadata was supplied', async function () {
    const spec = await loadSpec('@readme/oas-examples/3.0/json/security.json').then(Oas.init);
    await spec.dereference();

    const operation = spec.operation('/apiKey', 'get');

    await prepareParams(operation, {}, {})
      .then(() => assert.fail())
      .catch(err => {
        expect(err.message).to.equal(
          "You supplied metadata and/or body data for this operation but it doesn't have any documented parameters or request payloads. If you think this is an error please contact support for the API you're using."
        );
      });
  });

  it('should prepare nothing if nothing was supplied (and the operation has no required defaults)', async function () {
    const operation = readmeSpec.operation('/api-specification', 'post');

    expect(await prepareParams(operation)).to.deep.equal({});
    expect(await prepareParams(operation, {}, {})).to.deep.equal({});
  });

  it('should prepare body and metadata when both are supplied', async function () {
    const operation = readmeSpec.operation('/api-specification', 'post');
    const body = {
      spec: 'this is the contents of an api specification',
    };

    const metadata = {
      'x-readme-version': '1.0',
    };

    expect(await prepareParams(operation, body, metadata)).to.deep.equal({
      body: {
        spec: 'this is the contents of an api specification',
      },
      header: {
        'x-readme-version': '1.0',
      },
    });
  });

  it('should prepare body if body is a primitive', async function () {
    const operation = Oas.init(payloadExamples).operation('/primitiveBody', 'put');
    const body = 'Brie cheeseburger ricotta.';

    expect(await prepareParams(operation, body, {})).to.deep.equal({
      body,
    });
  });

  it('should prepare body if body is an array', async function () {
    const operation = Oas.init(payloadExamples).operation('/arraySchema', 'put');
    const body = [
      {
        name: 'Buster',
      },
    ];

    expect(await prepareParams(operation, body, {})).to.deep.equal({
      body,
    });
  });

  it('should ignore supplied body data if the request has no request body', async function () {
    const spec = await loadSpec('@readme/oas-examples/3.0/json/petstore.json').then(Oas.init);
    await spec.dereference();

    const operation = spec.operation('/pet/{petId}', 'get');

    const body = [{ name: 'Buster' }];
    const metadata = {
      petId: 1234,
    };

    expect(await prepareParams(operation, body, metadata)).to.deep.equal({
      path: { petId: 1234 },
    });
  });

  it('should ignore a supplied second parameter if its an empty object', async function () {
    const spec = await loadSpec('@readme/oas-examples/3.0/json/petstore.json').then(Oas.init);
    await spec.dereference();

    const operation = spec.operation('/pet/findByStatus', 'get');

    const metadata = {
      status: ['available'],
    };

    expect(await prepareParams(operation, metadata, {})).to.deep.equal({
      query: {
        status: ['available'],
      },
    });
  });

  describe('content types', function () {
    describe('application/x-www-form-urlencoded', function () {
      it('should support preparing formData payloads', async function () {
        const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
        const body = {
          criteria: '*:*',
        };

        const metadata = {
          dataset: 'v1',
          version: 'oa_citations',
        };

        expect(await prepareParams(operation, body, metadata)).to.deep.equal({
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
      it('should should filter out metadata parameters from being sent twice', async function () {
        const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');

        const metadata = {
          dataset: 'v1',
          version: 'oa_citations',
        };

        expect(await prepareParams(operation, metadata)).to.deep.equal({
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

    describe('image/png', function () {
      it('should support a file path payload', async function () {
        const operation = fileUploads.operation('/anything/image-png', 'post');
        const body = `${__dirname}/../__fixtures__/owlbert.png`;

        const res = await prepareParams(operation, body);
        expect(res.body).to.contain('data:image/png;name=owlbert.png;base64,');
        expect(res.files).to.have.property('owlbert.png').and.be.an.instanceOf(Buffer);
      });

      it('should support a file stream payload', async function () {
        const operation = fileUploads.operation('/anything/image-png', 'post');
        const body = fs.createReadStream('./test/__fixtures__/owlbert.png');

        const res = await prepareParams(operation, body);
        expect(res.body).to.contain('data:image/png;name=owlbert.png;base64,');
        expect(res.files).to.have.property('owlbert.png').and.be.an.instanceOf(Buffer);
      });
    });

    describe('multipart/form-data', function () {
      it('should handle a multipart body when a property is a file path', async function () {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: require.resolve('@readme/oas-examples/3.0/json/readme.json'),
        };

        const res = await prepareParams(operation, body);
        expect(res.body).to.have.property('documentFile').and.contain('data:application/json;name=readme.json;base64,');
        expect(res.files).to.have.property('readme.json').and.be.an.instanceOf(Buffer);
      });

      it('should handle when the file path is relative', async function () {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: './test/__fixtures__/owlbert.png',
        };

        const res = await prepareParams(operation, body);
        expect(res.body).to.have.property('documentFile').and.contain('data:image/png;name=owlbert.png;base64,');
        expect(res.files).to.have.property('owlbert.png').and.be.an.instanceOf(Buffer);
      });

      it('should handle a multipart body when a property is a file stream', async function () {
        const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
        const body = {
          documentFile: fs.createReadStream('./test/__fixtures__/owlbert.png'),
        };

        const res = await prepareParams(operation, body);
        expect(res.body).to.have.property('documentFile').and.contain('data:image/png;name=owlbert.png;base64,');
        expect(res.files).to.have.property('owlbert.png').and.be.an.instanceOf(Buffer);
      });
    });
  });

  describe('file handling', function () {
    it('should reject unknown file handlers', async function () {
      const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
      const body = {
        documentFile: ['this is not a file handler'],
      };

      await prepareParams(operation, body)
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal(
            'The data supplied for the `documentFile` request body parameter is not a file handler that we support.'
          );
        });
    });

    // This test sounds weird but we don't have a great way to know if a string we have is a path
    // to a file that doesn't exist or the string contents of a file, so we're just passing along
    // file paths that don't exist right now.
    it("should not reject files that don't exist", async function () {
      const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
      const body = {
        documentFile: './test/__fixtures__/owlbert.jpg',
      };

      expect(await prepareParams(operation, body)).to.deep.equal({
        body: {
          documentFile: './test/__fixtures__/owlbert.jpg',
        },
      });
    });
  });

  describe('supplying just a body or metadata', function () {
    it('should handle if supplied is a body', async function () {
      const operation = fileUploads.operation('/anything/multipart-formdata', 'post');
      const body = {
        documentFile: 'this is the contents of a document',
      };

      expect(await prepareParams(operation, body)).to.deep.equal({
        body,
      });
    });

    it('should prepare a body if supplied is primitive', async function () {
      const operation = fileUploads.operation('/anything/image-png', 'post');
      const body = 'this is a primitive value';

      expect(await prepareParams(operation, body)).to.deep.equal({
        body,
      });
    });

    it('should prepare just a body if supplied argument is an array', async function () {
      const operation = Oas.init(payloadExamples).operation('/arraySchema', 'put');
      const body = [
        {
          name: 'Buster',
        },
      ];

      expect(await prepareParams(operation, body)).to.deep.equal({
        body,
      });
    });

    it('should prepare metadata if more than 25% of the supplied argument lines up with known parameters', async function () {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        version: 'v1',
        dataset: 'oa_citations',
        randomUnknownParameter: true,
      };

      expect(await prepareParams(operation, body)).to.deep.equal({
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

    it('should prepare metadata if less than 25% of the supplied argument lines up with known parameters', async function () {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        randomUnknownParameter: true,
        randomUnknownParameter2: true,
        randomUnknownParameter3: true,
        randomUnknownParameter4: true,
        version: 'v1', // This a known parameter, but the others aren't and should be treated as body payload data.
      };

      expect(await prepareParams(operation, body)).to.deep.equal({
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

    it('should prepare just metadata if supplied is metadata', async function () {
      const operation = readmeSpec.operation('/api-specification', 'post');
      const metadata = {
        'x-readme-version': '1.0',
      };

      expect(await prepareParams(operation, metadata)).to.deep.equal({
        header: {
          'x-readme-version': '1.0',
        },
      });
    });
  });

  describe('parameter types', function () {
    let parameterStyle;

    beforeEach(async function () {
      parameterStyle = await loadSpec('@readme/oas-examples/3.1/json/parameters-style.json').then(Oas.init);
      await parameterStyle.dereference();
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    [
      ['cookies', '/cookies', 'get', 'cookie'],
      ['headers', '/anything/headers', 'get', 'header'],
      ['query', '/anything/query', 'get', 'query'],
    ].forEach(([_, path, method, paramName]) => {
      it(`should support ${_}`, async function () {
        const operation = parameterStyle.operation(path, method);
        const metadata = {
          primitive: 'buster',
        };

        expect(await prepareParams(operation, metadata)).to.deep.equal({
          [paramName]: {
            primitive: 'buster',
          },
        });
      });
    });

    it('should support matching on case-insensitive header parameters', async function () {
      const operation = parameterStyle.operation('/anything/headers', 'get');
      const metadata = {
        PrimItive: 'buster',
      };

      expect(await prepareParams(operation, metadata)).to.deep.equal({
        header: {
          primitive: 'buster',
        },
      });
    });

    describe('`accept` header overrides', function () {
      it('should support supplying an `accept` header parameter', async function () {
        const operation = parameterStyle.operation('/anything/headers', 'get');
        const metadata = {
          primitive: 'buster',
          accept: 'application/json',
        };

        expect(await prepareParams(operation, metadata)).to.deep.equal({
          header: {
            primitive: 'buster',
            accept: 'application/json',
          },
        });
      });

      it('should support supplying a case-insensitive `accept` header parameter', async function () {
        const operation = parameterStyle.operation('/anything/headers', 'get');
        const metadata = {
          primitive: 'buster',
          ACCept: 'application/json',
        };

        expect(await prepareParams(operation, metadata)).to.deep.equal({
          header: {
            primitive: 'buster',
            accept: 'application/json',
          },
        });
      });

      it('should support supplying **only** an `accept` header parameter', async function () {
        const operation = parameterStyle.operation('/anything/headers', 'get');
        const metadata = {
          accept: 'application/json',
        };

        expect(await prepareParams(operation, metadata)).to.deep.equal({
          header: {
            accept: 'application/json',
          },
        });
      });
    });

    it('should support path parameters', async function () {
      const operation = parameterStyle.operation('/anything/path/{primitive}/{array}/{object}', 'get');
      const metadata = {
        primitive: 'buster',
        array: ['buster'],
        object: {
          name: 'buster',
          description: 'the dog',
        },
      };

      expect(await prepareParams(operation, metadata)).to.deep.equal({
        path: {
          primitive: 'buster',
          array: ['buster'],
          object: { name: 'buster', description: 'the dog' },
        },
      });
    });
  });

  describe('defaults', function () {
    it('should prefill defaults for required body parameters if not supplied', async function () {
      const oas = await loadSpec('../__fixtures__/definitions/nested-defaults.json').then(Oas.init);
      await oas.dereference();

      const operation = oas.operation('/pet', 'post');
      expect(await prepareParams(operation, { id: 404 })).to.deep.equal({
        body: {
          id: 404,
          category: { name: 'dog' },
          name: 'buster',
        },
      });
    });

    it('should prefill defaults for required body parameters (on formData-used operations) if not supplied', async function () {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const metadata = {
        version: 'v2',
        dataset: 'dog_treats',
      };

      expect(await prepareParams(operation, metadata)).to.deep.equal({
        formData: {
          criteria: '*:*',
        },
        path: {
          version: 'v2',
          dataset: 'dog_treats',
        },
      });
    });

    it('should prefill defaults for required metadata parameters if not supplied', async function () {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');

      expect(await prepareParams(operation)).to.deep.equal({
        formData: {
          criteria: '*:*',
        },
        path: {
          version: 'v1',
          dataset: 'oa_citations',
        },
      });
    });

    it('should not override any user-provided data with defaults', async function () {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = { criteria: 'query:dogs' };
      const metadata = { version: 'v2', dataset: 'dog_treats' };

      expect(await prepareParams(operation, body, metadata)).to.deep.equal({
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
