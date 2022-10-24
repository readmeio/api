import serverVariables from '@readme/oas-examples/3.0/json/server-variables.json';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import uniqueTempDir from 'unique-temp-dir';

import api from '../src';
import Cache from '../src/cache';

let sdk;
const petId = 123;
const response = {
  id: petId,
  name: 'Buster',
};

describe('#server()', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  this.beforeAll(function () {
    // Set a unique cache dir so these tests won't collide with other tests and we don't need to go
    // through the trouble of mocking out the filesystem.
    Cache.setCacheDir(uniqueTempDir());
  });

  beforeEach(function () {
    sdk = api(serverVariables);
  });

  afterEach(function () {
    fetchMock.restore();
  });

  it('should use server variable defaults if no server or variables are supplied', async function () {
    fetchMock.post('https://demo.example.com:443/v2/global', response);

    await sdk.postGlobal().then(({ data }) => expect(data).to.deep.equal(response));
  });

  it('should support supplying a full server url', async function () {
    fetchMock.post('https://buster.example.com:3000/v14/global', response);

    sdk.server('https://buster.example.com:3000/v14');

    await sdk.postGlobal().then(({ data }) => expect(data).to.deep.equal(response));
  });

  it('should support supplying a server url with server variables', async function () {
    fetchMock.post('http://dev.local/v14/global', response);

    sdk.server('http://{name}.local/{basePath}', {
      name: 'dev',
      basePath: 'v14',
    });

    await sdk.postGlobal().then(({ data }) => expect(data).to.deep.equal(response));
  });

  it.skip('should be able to supply a url on an OAS that has no servers defined');

  it.skip("should be able to supply a url that doesn't match any defined server");
});
