/* eslint-disable jest-formatting/padding-around-test-blocks */
const nock = require('nock');
const { join } = require('path');
const api = require('../src');

const petstore = api(join(__dirname, './__fixtures__/petstore.json'));

const serverUrl = 'https://api.example.com';
const createOas = require('./__fixtures__/createOas')(serverUrl);

console.logx = obj => {
  // eslint-disable-next-line global-require
  console.log(require('util').inspect(obj, false, null, true));
};

describe('#preloading', () => {
  it.todo('should error if passing in swagger 2');
  it.todo('should error if oas file is not valid');
  it.todo('should default to swagger.json/openapi.json');
  it.todo('should fetch files over http');
  it.todo('should fetch files from disk');
  it.todo('should work for yaml');
  it.todo('should work for json');

  it.todo('should deref before caching');

  it('should work for object', () => {
    const sdk = api(createOas());
    expect(typeof sdk.get).toBe('function');
  });
});

describe('#accessors', () => {
  it('should have a function for each http method', () => {
    ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].forEach(method => {
      expect(typeof petstore[method]).toBe('function');
    });
  });

  describe('#operationId()', () => {
    it('should work for operationId', () => {
      const mock = nock('http://petstore.swagger.io/v1').get('/pets').reply(200);
      expect(() => petstore.listPets()).not.toThrow();
      mock.done();
    });

    it('should work for other methods', () => {
      const mock = nock('http://petstore.swagger.io/v1').post('/pets').reply(200, {});
      expect(() => petstore.createPets()).not.toThrow();
      mock.done();
    });

    it.todo('should allow operationId to be the same as a http method');
    it.todo('should allow namespaced operationIds'); // sdk.name.space()
    it.todo('should suggest a similar sounding operation name');

    it('should error if an operationId does not exist', () => {
      expect(() => petstore.listPetz()).toThrow(/not a function/);
    });
  });

  describe('#method(path)', () => {
    it('should work for method and path', () => {
      const mock = nock('http://petstore.swagger.io/v1').get('/pets').reply(200);
      expect(() => petstore.get('/pets')).not.toThrow();
      mock.done();
    });

    it.todo('should error if method and path does not exist');
  });
});

describe('#fetch', () => {
  const petId = 123;
  const body = { a: 1 };

  describe('operationId', () => {
    it.todo('should pass through path/body/other params');
    it.todo('should pass through query params');
    it.todo('should pass through header params');
    it.todo('should pass through auth params');

    it('should pass through path params for operationId', () => {
      const response = {
        id: petId,
        name: 'Buster',
      };

      const mock = nock('http://petstore.swagger.io/v1').get(`/pets/${petId}`).reply(200, response);

      return petstore
        .showPetById({ petId })
        .then(res => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual(response);
          mock.done();
        });
    });

    it('should pass through body for operationId', () => {
      const mock = nock('http://petstore.swagger.io/v1')
        .post('/pets', body)
        .reply(200, (uri, requestBody) => {
          return {
            a: requestBody.a + 100,
          };
        });

      return petstore
        .createPets(body)
        .then(res => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual({ a: 101 });
          mock.done();
        });
    });

    it('should pass through path params and body for operationId', () => {
      const mock = nock('http://petstore.swagger.io/v1')
        .put(`/pets/${petId}`, body)
        .reply(200, (uri, requestBody) => {
          return {
            a: requestBody.a + 100,
          };
        });

      return petstore
        .updatePetById({ petId }, body)
        .then(res => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual({ a: 101 });
          mock.done();
        });
    });
  });

  describe('method + path', () => {
    it.todo('should pass through path/body/other params');
    it.todo('should pass through query params');
    it.todo('should pass through header params');
    it.todo('should pass through auth params');

    it('should pass through body for method + path', () => {
      const mock = nock('http://petstore.swagger.io/v1')
        .post('/pets', body)
        .reply(200, (uri, requestBody) => {
          return {
            a: requestBody.a + 100,
          };
        });

      return petstore
        .post('/pets', body)
        .then(res => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual({ a: 101 });
          mock.done();
        });
    });

    it('should pass through path params for method + path', () => {
      const sdk = api(
        createOas('put', '/{id}', {
          parameters: [
            {
              name: 'id',
              in: 'path',
              schema: {
                type: 'string',
              },
            },
          ],
        })
      );

      const mock = nock(serverUrl).put('/123').reply(200);
      return sdk.put('/{id}', { id: 123 }).then(res => {
        expect(res.status).toBe(200);
        expect(res.url).toBe(`${serverUrl}/123`);
        mock.done();
      });
    });

    it('should pass through path params and body params for method + path', () => {
      const sdk = api(
        createOas('put', '/{id}', {
          parameters: [
            {
              name: 'id',
              in: 'path',
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    a: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        })
      );

      const mock = nock(serverUrl)
        .put('/123', { a: 1 })
        .reply(200, (uri, requestBody) => {
          return { a: requestBody.a + 100 };
        });

      return sdk
        .put('/{id}', { id: 123 }, { a: 1 })
        .then(res => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then(res => {
          expect(res).toStrictEqual({ a: 101 });
          mock.done();
        });
    });
  });

  describe('validation', () => {
    it.todo('should validate body based on JSON Schema');
    it.todo('should validate path params');
    it.todo('should validate query params');
    it.todo('should validate header params');
    it.todo('should validate auth params');
  });
});
