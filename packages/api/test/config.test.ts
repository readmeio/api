import type { OASDocument } from 'oas/dist/rmoas.types';

import petstore from '@readme/oas-examples/3.0/json/petstore.json';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../src';
import Cache from '../src/cache';

import { response, responses as mockResponses } from './helpers/fetch-mock';

let sdk;
const petId = 123;

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

    afterEach(function () {
      fetchMock.restore();
    });

    it('should give access to the Response object if `parseResponse` is `false`', async function () {
      fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponses.real(response));

      sdk.config({ parseResponse: false });

      const res = await sdk.deletePet({ petId });

      // We can't do an `instanceOf` check on `res` because on Node 18 the `Response` object we
      // have here apparently isn't the same one that is being used in Node 18's native `fetch`
      // implementation.
      expect(res.constructor.name).to.equal('Response');
      expect(res.status).to.equal(200);

      expect(await res.json()).to.deep.equal(response);
      fetchMock.restore();
    });

    it('should parse the response if `parseResponse` is `undefined`', async function () {
      fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponses.real(response));

      sdk.config({ unrecognizedConfigParameter: false });

      const res = await sdk.deletePet({ petId });
      expect(res.constructor.name).to.equal('Object');
      expect(res).to.deep.equal(response);
      fetchMock.restore();
    });
  });
});
