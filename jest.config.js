// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  transformIgnorePatterns: ["/node_modules/(?!babel-plugin-react-native-style-convert-plugin)"],
  testEnvironment: 'node',
  // transform: {
  //   '^.+\\.js$': 'esm'
  // },
  globals: {
    NODE_ENV: 'test',
  },
};
