const nock = require('nock');
const api = require('../src');
const { Response } = require('node-fetch');

const petstore = require('@readme/oas-examples/3.0/json/petstore.json');

let sdk;
const petId = 123;
const response = {
  id: petId,
  name: 'Buster',
};

describe('#config()', () => {
  describe('parseResponse', () => {
    beforeEach(() => {
      sdk = api(petstore);
    });

    it('should give access to the Response object if `parseResponse` is `false`', () => {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ parseResponse: false });

      return sdk.deletePet({ petId }).then(async res => {
        expect(res instanceof Response).toBe(true);
        expect(res.status).toBe(200);
        await expect(res.json()).resolves.toStrictEqual(response);
        mock.done();
      });
    });

    it('should parse the response if `parseResponse` is `undefined`', () => {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ unrecognizedConfigParameter: false });

      return sdk.deletePet({ petId }).then(res => {
        expect(res instanceof Response).toBe(false);
        expect(res).toStrictEqual(response);
        mock.done();
      });
    });
  });
});
