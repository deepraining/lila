const webpackPlugin = require('../../../lila-webpack/lib');
const webpackConfigPlugin = require('../../../lila-webpack-config/lib');

module.exports = lila => {
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return () => ({
    cssModules: !0,
    cssModulesExclude: [/node_modules/, /src\/test/],
    flow: !0,
    // flowRuntime: !0,
    alias: {
      base: 'alias/base',
      common: 'alias/common',
    },
    define: {
      __DEFINE__: JSON.stringify('define'),
    },
    // staticServer: 'https://www.google.com/lila',
    // minHtml: !0,
    // minHtmlOptions: {},
    // minCss: !0,
    // minJs: !0,
    // splitJs: {
    //   lib: ['react', 'react-dom'],
    // },
    // splitJs: {
    //   lib1: ['react'],
    //   lib2: ['react-dom'],
    // },
  });
};
