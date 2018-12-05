module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'import', 'node', 'jest', 'flowtype'],
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
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
