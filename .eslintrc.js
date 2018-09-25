module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'import', 'node', 'jest'],
  env: {
    node: true,
    es6: true,
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
