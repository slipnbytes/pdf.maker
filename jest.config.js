/**
 * @type {import('@jest/types/build/Config').DefaultOptions}
 */
module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  rootDir: __dirname,
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
  setupFilesAfterEnv: ['<rootDir>/jest/cleanupBrowser.ts'],
};
