const nock = require('nock');
const api = require('../src');
const { Response } = require('node-fetch');

const serverUrl = 'https://api.example.com';
const createOas = require('./__fixtures__/createOas')(serverUrl);

describe('#config()', () => {
  describe('parseResponse: false', () => {
    it('should give access to the Response object', () => {
      const petId = 123;
      const response = {
        id: petId,
        name: 'Buster',
      };

      const sdk = api(
        createOas('delete', `/pets/${petId}`, {
          operationId: 'deletePet',
        })
      );

      const mock = nock(serverUrl).delete(`/pets/${petId}`).reply(200, response);

      sdk.config({ parseResponse: false });

      return sdk.deletePet({ id: petId }).then(async res => {
        expect(res instanceof Response).toBe(true);
        expect(res.status).toStrictEqual(200);
        expect(await res.json()).toStrictEqual(response);
        mock.done();
      });
    });
  });
});
