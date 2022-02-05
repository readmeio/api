module.exports = {
  coveragePathIgnorePatterns: ['/dist', '/node_modules', '/__tests__/__fixtures__/'],
  globals: {
    'ts-jest': {
      tsconfig: '__tests__/tsconfig.json',
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest/presets/js-with-ts',
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['/__tests__/__fixtures__/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  transform: {},
};
