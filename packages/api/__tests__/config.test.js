require('isomorphic-fetch');
const nock = require('nock');
const api = require('../src');

const petstore = require('@readme/oas-examples/3.0/json/petstore.json');

let sdk;
const petId = 123;
const response = {
  id: petId,
  name: 'Buster',
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
  nock.restore();
});

describe('#config()', () => {
  describe('parseResponse', () => {
    beforeEach(() => {
      sdk = api(petstore);
    });

    it('should give access to the Response object if `parseResponse` is `false`', async () => {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ parseResponse: false });

      const res = await sdk.deletePet({ petId });
      expect(res instanceof Response).toBe(true);
      expect(res.status).toBe(200);

      await expect(res.json()).resolves.toStrictEqual(response);
      mock.done();
    });

    it('should parse the response if `parseResponse` is `undefined`', async () => {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ unrecognizedConfigParameter: false });

      const res = await sdk.deletePet({ petId });
      expect(res instanceof Response).toBe(false);
      expect(res).toStrictEqual(response);
      mock.done();
    });
  });
});
