module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'import', 'node', 'jest'],
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
