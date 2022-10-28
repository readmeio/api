import chai, { expect } from 'chai';
import 'isomorphic-fetch';

import parseResponse from '../../src/core/parseResponse';
import chaiPlugins from '../helpers/chai-plugins';

chai.use(chaiPlugins);

const responseBody = JSON.stringify({
  id: 9205436248879918000,
  category: { id: 0 },
  name: '1',
  photoUrls: ['1'],
  tags: [],
});

let response;

describe('#parseResponse', function () {
  beforeEach(function () {
    response = new Response(responseBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'x-custom-header': 'buster',
      },
    });
  });

  it('should parse `application/json` response as json', async function () {
    const { data, status, headers, res } = await parseResponse(response);

    expect(data).to.deep.equal(JSON.parse(responseBody));
    expect(status).to.equal(200);
    expect(headers).to.have.header('content-type', 'application/json');
    expect(headers).to.have.header('x-custom-header', 'buster');
    expect(res).to.be.a('Response');
  });

  it('should parse `application/vnd.api+json` as json', async function () {
    response.headers.set('Content-Type', 'application/vnd.api+json');
    const { data, status, headers, res } = await parseResponse(response);

    expect(data).to.deep.equal(JSON.parse(responseBody));
    expect(status).to.equal(200);
    expect(headers).to.have.header('content-type', 'application/vnd.api+json');
    expect(headers).to.have.header('x-custom-header', 'buster');
    expect(res).to.be.a('Response');
  });

  it('should parse non-json response as text', async function () {
    const nonJsonResponseBody = '<xml-string />';
    const nonJsonResponse = new Response('<xml-string />', {
      status: 202,
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    const { data, status, headers, res } = await parseResponse(nonJsonResponse);

    expect(data).to.equal(nonJsonResponseBody);
    expect(status).to.equal(202);
    expect(headers).to.have.header('content-type', 'application/xml');
    expect(res).to.be.a('Response');
  });

  it('should not error if invalid json is returned', async function () {
    // `JSON.parse('plain text')` will throw an exception, but if that happens we should just treat
    // the content as plain text.
    const invalidJsonResponse = new Response('plain text', {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data, status, headers, res } = await parseResponse(invalidJsonResponse);

    expect(data).to.equal('plain text');
    expect(status).to.equal(404);
    expect(headers).to.have.header('content-type', 'application/json');
    expect(res).to.be.a('Response');
  });

  it('should default to JSON with wildcard content-type', async function () {
    const wildcardResponse = new Response(responseBody, {
      headers: {
        'Content-Type': '*/*',
      },
    });

    const { data, status, headers, res } = await parseResponse(wildcardResponse);

    expect(data).to.deep.equal(JSON.parse(responseBody));
    expect(status).to.equal(200);
    expect(headers).to.have.header('content-type', '*/*');
    expect(res).to.be.a('Response');
  });

  it('should return with empty string if there is no response', async function () {
    const emptyResponse = new Response(null, {
      status: 204,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data, status, headers, res } = await parseResponse(emptyResponse);

    expect(data).to.equal('');
    expect(status).to.equal(204);
    expect(headers).to.have.header('content-type', 'application/json');
    expect(res).to.be.a('Response');
  });
});
