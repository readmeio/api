import { expect } from 'chai';
import nock from 'nock';
import api from '../src';

import petstore from '@readme/oas-examples/3.0/json/petstore.json';

let sdk;
const petId = 123;
const response = {
  id: petId,
  name: 'Buster',
};

describe('#config()', function () {
  describe('parseResponse', function () {
    beforeEach(function () {
      sdk = api(petstore);
    });

    it('should give access to the Response object if `parseResponse` is `false`', async function () {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ parseResponse: false });

      const res = await sdk.deletePet({ petId });
      expect(res).to.be.instanceOf(Response);
      expect(res.status).to.equal(200);

      expect(await res.json()).to.deep.equal(response);
      mock.done();
    });

    it('should parse the response if `parseResponse` is `undefined`', async function () {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ unrecognizedConfigParameter: false });

      const res = await sdk.deletePet({ petId });
      expect(res).not.to.be.instanceOf(Response);
      expect(res).to.deep.equal(response);
      mock.done();
    });
  });
});
