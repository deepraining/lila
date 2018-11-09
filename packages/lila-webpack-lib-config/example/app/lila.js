const tasksPlugin = require('../../../lila-tasks/lib');
const webpackPlugin = require('../../../lila-webpack-lib/lib');
const webpackConfigPlugin = require('../../../lila-webpack-lib-config/lib');

module.exports = lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return ({ entry }) => ({
    tasks: [
      '@lila/webpack',
      [
        '@lila/move',
        { source: 'build/index.html', target: `build/${entry}.html` },
      ],
    ],
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
    // minCss: !1,
    // minJs: !1,
    // banner: '/* hello */',
    // filename: 'hi',
    // library: 'Demo',
    // externals: {}
  });
};
