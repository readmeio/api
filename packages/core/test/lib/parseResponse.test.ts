import 'isomorphic-fetch';
import { expect } from 'chai';
import parseResponse from '../../src/lib/parseResponse';

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
      headers: {
        'Content-Type': 'application/json',
        'x-custom-header': 'application/json',
      },
    });
  });

  it('should parse application/json response as json', async function () {
    expect(await parseResponse(response)).to.deep.equal(JSON.parse(responseBody));
  });

  it('should parse application/vnd.api+json as json', async function () {
    response.headers['Content-Type'] = 'application/vnd.api+json';
    expect(await parseResponse(response)).to.deep.equal(JSON.parse(responseBody));
  });

  it('should parse non-json response as text', async function () {
    const nonJsonResponseBody = '<xml-string />';
    const nonJsonResponse = new Response('<xml-string />', {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    expect(await parseResponse(nonJsonResponse)).to.equal(nonJsonResponseBody);
  });

  it('should not error if invalid json is returned', async function () {
    const invalidJsonResponse = new Response('plain text', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(await parseResponse(invalidJsonResponse)).to.equal('plain text');
  });

  it('should default to JSON with wildcard content-type', async function () {
    const wildcardResponse = new Response(responseBody, {
      headers: {
        'Content-Type': '*/*',
      },
    });

    expect(await parseResponse(wildcardResponse)).to.deep.equal(JSON.parse(responseBody));
  });

  it('should return with empty string if there is no response', async function () {
    const emptyResponse = new Response(null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(await parseResponse(emptyResponse)).to.equal('');
  });
});
