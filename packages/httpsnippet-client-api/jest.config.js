/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coveragePathIgnorePatterns: [
    '/dist',
    '/node_modules',
    '/test/__datasets__/',
    '/test/__fixtures__/',
    '/test/helpers/',
  ],
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['/test/__datasets__/', '/test/__fixtures__/', '/test/helpers/'],
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: 'test/tsconfig.json',
      },
    ],
  },
};
