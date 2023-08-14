import type { OASDocument } from 'oas/dist/rmoas.types';

import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';
import { describe, beforeAll, beforeEach, afterEach, it, expect } from 'vitest';

import api from '../src';
import Cache from '../src/cache';

import { response, responses as mockResponses } from './helpers/fetch-mock';
import loadSpec from './helpers/load-spec';

let petstore;
let sdk;
const petId = 123;

describe('#config()', () => {
  beforeAll(async () => {
    petstore = await loadSpec('@readme/oas-examples/3.0/json/petstore.json');

    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  describe('timeout', () => {
    beforeEach(() => {
      sdk = api(petstore as unknown as OASDocument);
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('should override the default `fetch` timeout if present and fail if request takes too long', async () => {
      fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponses.delay(response, 500));

      sdk.config({ timeout: 100 });

      await expect(sdk.deletePet({ petId })).rejects.toThrow('The operation was aborted.');
    });

    it('should override the default `fetch` timeout and return if request is quick', async () => {
      fetchMock.delete(`http://petstore.swagger.io/v2/pet/${petId}`, mockResponses.delay(response, 100));

      sdk.config({ timeout: 500 });

      await sdk.deletePet({ petId }).then(({ data }) => {
        expect(data).toStrictEqual(response);
      });
    });
  });
});
