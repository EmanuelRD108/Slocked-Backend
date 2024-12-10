module.exports = {
  // other Jest configurations...
  testEnvironment: 'node',
  // ... other configurations ...
  // Add the esModuleInterop configuration
  // It allows you to use default imports with CommonJS modules
  // If you don't have other transform options, you can remove the "transform" line entirely
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  globals: {
    'ts-jest': {
      // ...
      'babelConfig': true,
    },
  },
}
  