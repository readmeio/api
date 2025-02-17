/* eslint-disable import/no-extraneous-dependencies */
import nock from 'nock';
import { beforeAll, afterAll } from 'vitest';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
