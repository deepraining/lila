import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import { defaultExtensions, defaultMinHtmlOptions } from './defaults';
import { babelLoader, htmlLoader, urlLoader, vueLoader } from './rules';
import { styleLoaders } from './make';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [root, srcDir] = getSettings(['root', 'src']);
  const srcPath = join(root, srcDir);

  const { ProvidePlugin, DefinePlugin } = webpack;

  const {
    babelImport = [],
    babelExclude = [/node_modules/],
    babelPresets = [],
    babelPlugins = [],
    extensions = defaultExtensions,
    provide = {},
    define = {},
    alias = {},
    minHtml = !0,
    minHtmlOptions = defaultMinHtmlOptions,
    flow = !1,
    flowRuntime = !1,
    minJs = !0,
    devtool,
  } = config;

  const isBuild = cmd === 'build' || cmd === 'sync' || cmd === 'start';
  const development = cmd === 'dev' || cmd === 'serve';
  const noDevtool = cmd === 'analyze';

  return {
    plugins: [
      new ProvidePlugin(provide),
      new DefinePlugin(define),
      new HtmlWebpackPlugin({
        template: `${srcPath}/${
          entry === defaultEntry ? '' : `${entry}/`
        }index.html`,
        minify: isBuild && minHtml ? minHtmlOptions : false,
      }),
      new VueLoaderPlugin(),
    ],
    module: {
      rules: [
        babelLoader({
          babelImport,
          babelExclude,
          babelPresets,
          babelPlugins,
          flow,
          flowRuntime,
        }),
        urlLoader({ extensions }),
        htmlLoader(),
        vueLoader(),
        ...styleLoaders(lila, webpack, { entry, cmd, config }, isBuild),
      ],
    },
    resolve: {
      modules: [srcPath, 'node_modules'],
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue'],
      alias,
    },
    optimization: {
      minimize: isBuild && minJs,
    },
    devtool: noDevtool
      ? undefined
      : devtool || (development ? 'eval-source-map' : 'source-map'),
    // production mode provide uglifyjs-webpack-plugin by default
    mode: development ? 'development' : 'production',
  };
};
