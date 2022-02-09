import api from '../dist';
import nock from 'nock';
import uspto from '@readme/oas-examples/3.0/json/uspto.json';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.restore();
});

test('should be able to use the transpiled dist', async () => {
  const mock = nock('https://developer.uspto.gov/ds-api')
    .post('/oa_citations/v1/records')
    .reply(200, uri => uri);

  const sdk = api(uspto);

  await expect(sdk.post('/oa_citations/v1/records')).resolves.toBe('/ds-api/oa_citations/v1/records');

  mock.done();
});
