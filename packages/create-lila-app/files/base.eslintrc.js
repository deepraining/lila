module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: ['prettier', 'import', 'node', 'jest'],
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2024,
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
