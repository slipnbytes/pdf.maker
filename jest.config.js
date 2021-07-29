/**
 * @type {import('@jest/types/build/Config').DefaultOptions}
 */
module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  rootDir: __dirname,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageReporters: ['json', 'lcov'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['js', 'ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts}',
    '!<rootDir>/src/index.ts',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest/setTimeout.ts',
    '<rootDir>/jest/expectExtend.ts',
    '<rootDir>/jest/cleanupBrowser.ts',
  ],
};
