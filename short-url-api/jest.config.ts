/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'v1/(.*)': '<rootDir>/src/v1/$1',
  },
};
