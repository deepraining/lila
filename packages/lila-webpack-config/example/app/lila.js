const tasksPlugin = require('../../../lila-tasks/lib');
const webpackPlugin = require('../../../lila-webpack/lib');
const webpackConfigPlugin = require('../../../lila-webpack-config/lib');

module.exports = lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return ({ entry }) => ({
    // devMiddleware: { writeToDisk: !0, watchOptions: { ignored: /node_modules/ } },
    tasks: [
      '@lila/webpack',
      [
        '@lila/move',
        { source: 'build/index.html', target: `build/${entry}.html` },
      ],
    ],
    cssModules: !0,
    cssModulesExclude: [/node_modules/, /src\/test/, /src\/vue/],
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
    // minHtml: !1,
    // minHtmlOptions: {},
    // minCss: !1,
    // minJs: !1,
    // splitJs: {
    //   lib: ['react', 'react-dom'],
    // },
    // splitJs: {
    //   lib1: ['react'],
    //   lib2: ['react-dom'],
    // },
  });
};
