module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.{js,jsx}'],
  setupFiles: ['<rootDir>/test/setupGlobals.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setupAfterEnv.js'],
  moduleNameMapper: {
    // Resolve the webpack `config` alias to the dev config for tests.
    '^config$': '<rootDir>/src/devconfig.js',
    // mapbox-gl needs WebGL/workers that jsdom lacks; stub it.
    '^mapbox-gl$': '<rootDir>/test/mapboxMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(gif|png|jpe?g|svg|ico|eot|woff2?|ttf)$': '<rootDir>/test/fileMock.js'
  },
  collectCoverageFrom: [
    'src/redux/**/*.js',
    'src/components/**/*.{js,jsx}',
    '!src/**/*.less',
    '!src/**/*.css'
  ]
};
