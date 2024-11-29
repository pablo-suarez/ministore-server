module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/../src/$1',
  },
  rootDir: 'src',
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/main.ts',
    '!**/*.config.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageReporters: ['lcov'],
};
