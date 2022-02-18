import { expect } from 'chai';
import nock from 'nock';
import api from '../src';

import serverVariables from '@readme/oas-examples/3.0/json/server-variables.json';

let sdk;
const petId = 123;
const response = {
  id: petId,
  name: 'Buster',
};

describe('#server()', function () {
  beforeEach(function () {
    sdk = api(serverVariables);
  });

  it('should use server variable defaults if no server or variables are supplied', async function () {
    const mock = nock('https://demo.example.com:443/v2/').post('/').reply(200, response);

    expect(await sdk.post('/')).to.deep.equal(response);
    mock.done();
  });

  it('should support supplying a full server url', async function () {
    const mock = nock('https://buster.example.com:3000/v14').post('/').reply(200, response);

    sdk.server('https://buster.example.com:3000/v14');

    expect(await sdk.post('/')).to.deep.equal(response);
    mock.done();
  });

  it('should support supplying a server url with server variables', async function () {
    const mock = nock('http://dev.local/v14').post('/').reply(200, response);

    sdk.server('http://{name}.local/{basePath}', {
      name: 'dev',
      basePath: 'v14',
    });

    expect(await sdk.post('/')).to.deep.equal(response);
    mock.done();
  });

  it.skip('should be able to supply a url on an OAS that has no servers defined');

  it.skip("should be able to supply a url that doesn't match any defined server");
});
