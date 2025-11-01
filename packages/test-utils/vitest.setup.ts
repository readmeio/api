import nock from 'nock';
import { afterAll, beforeAll } from 'vitest';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
