module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'import', 'node', 'flowtype'],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  rules: {
    'react/forbid-prop-types': [0],
    'react/jsx-no-bind': [0],
    'react/prop-types': [0],
    'react/prefer-stateless-function': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/anchor-is-valid': [0],
  },

  parserOptions: {
    ecmaVersion: 2017,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue'],
      },
    },
  },
};
