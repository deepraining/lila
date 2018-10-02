module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'import', 'react', 'jsx-a11y'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
};
