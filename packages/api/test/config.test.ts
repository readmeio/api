import type { OASDocument } from 'oas/@types/rmoas.types';

import { expect } from 'chai';
import nock from 'nock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../src';
import Cache from '../src/cache';

import petstore from '@readme/oas-examples/3.0/json/petstore.json';

let sdk;
const petId = 123;
const response = {
  id: petId,
  name: 'Buster',
};

describe('#config()', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  describe('parseResponse', function () {
    beforeEach(function () {
      sdk = api(petstore as unknown as OASDocument);
    });

    it('should give access to the Response object if `parseResponse` is `false`', async function () {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ parseResponse: false });

      const res = await sdk.deletePet({ petId });
      expect(res instanceof Response).to.be.true;
      expect(res.status).to.equal(200);

      expect(await res.json()).to.deep.equal(response);
      mock.done();
    });

    it('should parse the response if `parseResponse` is `undefined`', async function () {
      const mock = nock('http://petstore.swagger.io/v2').delete(`/pet/${petId}`).reply(200, response);

      sdk.config({ unrecognizedConfigParameter: false });

      const res = await sdk.deletePet({ petId });
      expect(res instanceof Response).to.be.false;
      expect(res).to.deep.equal(response);
      mock.done();
    });
  });
});
