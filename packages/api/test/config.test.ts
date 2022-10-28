import type { OASDocument } from 'oas/dist/rmoas.types';

import petstore from '@readme/oas-examples/3.0/json/petstore.json';
import { assert, expect } from 'chai';
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

  describe('timeout', function () {
    beforeEach(function () {
      sdk = api(petstore as unknown as OASDocument);
    });

    afterEach(function () {
      fetchMock.restore();
    });

    it('should override the default `fetch` timeout if present and fail if request takes too long', async function () {
      fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponses.delay(response, 500));

      sdk.config({ timeout: 100 });

      await sdk
        .deletePet({ petId })
        .then(() => assert.fail())
        .catch(err => {
          expect(err.message).to.equal('The operation was aborted.');
        });
    });

    it('should override the default `fetch` timeout and return if request is quick', async function () {
      fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponses.delay(response, 100));

      sdk.config({ timeout: 500 });

      await sdk.deletePet({ petId }).then(({ data }) => {
        expect(data).to.deep.equal(response);
      });
    });
  });
});
