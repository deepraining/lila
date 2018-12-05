module.exports = {
  root: true,
  extends: ['plugin:vue/recommended', 'prettier'],
  plugins: ['vue', 'prettier'],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
};
