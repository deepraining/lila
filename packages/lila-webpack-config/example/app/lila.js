import tasksPlugin from '../../../lila-tasks/lib';
import webpackPlugin from '../../../lila-webpack/lib';
// import webpackConfigPlugin from '../../lib';
import { forReactVue } from '../../lib';

export default lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  // webpackConfigPlugin(lila);
  forReactVue(lila);

  lila.setSetting('excludeEntries', [/\/exclude$/i]);

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
    babelImport: [
      [{ libraryName: 'antd', style: 'css' }, 'ant'],
      [{ libraryName: 'antd-mobile', style: 'css' }, 'ant-mobile'],
    ],
    babelComponent: [
      [
        { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' },
        'element-ui',
      ],
      [{ libraryName: 'mint-ui', style: true }, 'mint-ui'],
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
    // staticServer: 'https://www.google.com/lila',
    // minHtml: !1,
    // minHtmlOptions: {},
    // minCss: !1,
    // minJs: !1,
  });
};
