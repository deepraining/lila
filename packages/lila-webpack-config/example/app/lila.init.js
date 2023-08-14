import path from 'path';
import tasksPlugin from '../../../lila-tasks/lib';
import webpackPlugin from '../../../lila-webpack/lib';
import webpackConfigPlugin from '../../lib';

export default lila => {
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
    alias: {
      base: 'alias/base',
      common: 'alias/common',
    },
    define: {
      __DEFINE__: JSON.stringify('define'),
    },
    staticServer: 'https://www.google.com/lila',
    rebuildWebpackConfig({ webpackConfig }) {
      console.log('rebuildWebpackConfig');
      return webpackConfig;
    },
    sassResources: [path.resolve(__dirname, 'src/test/func.scss')],
  });
};
