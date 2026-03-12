module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: ['import', 'node', 'prettier', 'jest'],
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2024,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
      },
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
