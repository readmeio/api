// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coveragePathIgnorePatterns: ['/dist', '/node_modules', '/test/__fixtures__/', '/test/datasets/', '/test/helpers/'],
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['jest-extended/all', path.join(__dirname, 'test', 'helpers', 'jest.matchers.ts')],
  testPathIgnorePatterns: ['/test/__fixtures__/', '/test/datasets/', '/test/helpers/'],
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  testTimeout: 10000,
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: 'test/tsconfig.json',
      },
    ],
  },
};
