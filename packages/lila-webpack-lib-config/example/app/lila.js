import tasksPlugin from '../../../lila-tasks/lib';
import webpackPlugin from '../../../lila-webpack-lib/lib';
import webpackConfigPlugin from '../../lib';

export default lila => {
  const { setSetting } = lila;

  // setSetting('packages', 'pkgs');
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
