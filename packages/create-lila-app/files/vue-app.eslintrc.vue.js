module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
    'prettier',
  ],
  plugins: ['vue', 'import', 'node', 'prettier'],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2024,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
      },
    },
  },
};
