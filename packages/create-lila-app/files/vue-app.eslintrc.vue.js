module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
  ],
  plugins: ['vue', 'import', 'node', 'prettier', 'flowtype'],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
      },
    },
  },
};
