const Oas = require('@readme/oas-tooling');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const readmeExample = require('@readme/oas-examples/3.0/json/readme.json');
const usptoExample = require('@readme/oas-examples/3.0/json/uspto.json');

const serverUrl = 'https://api.example.com';
const createOas = require('../__fixtures__/createOas')(serverUrl);
const prepareParams = require('../../src/lib/prepareParams');

console.logx = obj => {
  // eslint-disable-next-line global-require
  console.log(require('util').inspect(obj, false, null, true));
};

const arraySchema = createOas('put', '/', {
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
});

describe('#prepareParams', () => {
  let readmeSpec;
  let usptoSpec;

  beforeAll(async () => {
    let schema = await $RefParser.dereference(readmeExample);
    readmeSpec = new Oas(schema);

    schema = await $RefParser.dereference(usptoExample);
    usptoSpec = new Oas(schema);
  });

  it('should prepare nothing if nothing was supplied', () => {
    const operation = readmeSpec.operation('/api-specification', 'post');

    expect(prepareParams(operation)).toStrictEqual({});
    expect(prepareParams(operation, null, null)).toStrictEqual({});
    expect(prepareParams(operation, [], [])).toStrictEqual({});
    expect(prepareParams(operation, {}, {})).toStrictEqual({});
  });

  it('should prepare body and metadata when both are supplied', async () => {
    const operation = readmeSpec.operation('/api-specification', 'post');
    const body = {
      spec: 'this is the contents of an api specification',
    };

    const metadata = {
      'x-readme-version': '1.0',
    };

    expect(prepareParams(operation, body, metadata)).toStrictEqual({
      body: {
        spec: 'this is the contents of an api specification',
      },
      header: {
        'x-readme-version': '1.0',
      },
    });
  });

  it('should prepare body if body is a primitive', () => {
    const schema = createOas('put', '/', {
      requestBody: {
        content: {
          'text/plain': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    });

    const operation = new Oas(schema).operation('/', 'put');
    const body = 'Brie cheeseburger ricotta.';

    expect(prepareParams(operation, body, {})).toStrictEqual({
      body,
    });
  });

  it('should prepare body if body is an array', () => {
    const operation = new Oas(arraySchema).operation('/', 'put');
    const body = [
      {
        name: 'Buster',
      },
    ];

    expect(prepareParams(operation, body, {})).toStrictEqual({
      body,
    });
  });

  it('should handle bodies when the content type is application/x-www-form-urlencoded', async () => {
    const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
    const body = {
      criteria: '*:*',
    };

    const metadata = {
      dataset: 'v1',
      version: 'oa_citations',
    };

    expect(prepareParams(operation, body, metadata)).toStrictEqual({
      path: {
        dataset: 'v1',
        version: 'oa_citations',
      },
      formData: {
        criteria: '*:*',
      },
    });
  });

  describe('supplying just a body or metadata', () => {
    it('should handle if supplied is a body', () => {
      const operation = readmeSpec.operation('/api-specification', 'post');
      const body = {
        spec: 'this is the contents of an api specification',
      };

      expect(prepareParams(operation, body)).toStrictEqual({
        body,
      });
    });

    it('should prepare a body if supplied is primitive', () => {
      const operation = readmeSpec.operation('/api-specification', 'post');
      const body = 'this is a primitive value';

      expect(prepareParams(operation, body)).toStrictEqual({
        body,
      });
    });

    it('should prepare just a body if supplied argument is an array', () => {
      const operation = new Oas(arraySchema).operation('/', 'put');
      const body = [
        {
          name: 'Buster',
        },
      ];

      expect(prepareParams(operation, body)).toStrictEqual({
        body,
      });
    });

    it('should prepare metadata if more than 25% of the supplied argument lines up with known parameters', () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        version: 'v1',
        dataset: 'oa_citations',
        randomUnknownParameter: true,
      };

      expect(prepareParams(operation, body)).toStrictEqual({
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

    it('should prepare metadata if less than 25% of the supplied argument lines up with known parameters', () => {
      const operation = usptoSpec.operation('/{dataset}/{version}/records', 'post');
      const body = {
        version: 'v1', // This a known parameter, but the others aren't and should be treated as body payload data.
        randomUnknownParameter: true,
        randomUnknownParameter2: true,
        randomUnknownParameter3: true,
        randomUnknownParameter4: true,
      };

      expect(prepareParams(operation, body)).toStrictEqual({
        formData: {
          version: 'v1',
          randomUnknownParameter: true,
          randomUnknownParameter2: true,
          randomUnknownParameter3: true,
          randomUnknownParameter4: true,
        },
      });
    });

    it('should prepare just metadata if supplied is metadata', () => {
      const operation = readmeSpec.operation('/api-specification', 'post');
      const metadata = {
        'x-readme-version': '1.0',
      };

      expect(prepareParams(operation, metadata)).toStrictEqual({
        header: {
          'x-readme-version': '1.0',
        },
      });
    });
  });

  it.todo(`should be able to handle parameters when they're defined as common parameters`);
});
