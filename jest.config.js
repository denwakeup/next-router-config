const { name: packageName } = require('./package.json');

module.exports = {
    name: packageName,
    displayName: packageName,
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    testMatch: ['<rootDir>/src/**/__tests__/*.ts'],
};
