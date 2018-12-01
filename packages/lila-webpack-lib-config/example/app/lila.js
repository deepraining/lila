const tasksPlugin = require('../../../lila-tasks/lib');
const webpackPlugin = require('../../../lila-webpack-lib/lib');
const webpackConfigPlugin = require('../../../lila-webpack-lib-config/lib');

module.exports = lila => {
  const { setSetting } = lila;

  // setSetting('src', 'components');
  setSetting('build', 'lib');

  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return () => ({
    tasks: [
      // ['@lila/del', 'lib'],
      '@lila/webpack',
    ],
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
    // banner: 'hello',
    // filename: 'hi',
    // library: 'Demo',
    externals: ['react', 'react-dom', 'vue'],
  });
};
