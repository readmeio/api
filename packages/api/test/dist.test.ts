import { expect } from 'chai';
import api from '../dist';
import nock from 'nock';
import uspto from '@readme/oas-examples/3.0/json/uspto.json';

describe('typescript dist verification', function () {
  it('should be able to use the transpiled dist', async function () {
    const mock = nock('https://developer.uspto.gov/ds-api')
      .post('/oa_citations/v1/records')
      .reply(200, uri => uri);

    const sdk = api(uspto);

    expect(await sdk.post('/oa_citations/v1/records')).to.equal('/ds-api/oa_citations/v1/records');

    mock.done();
  });
});
