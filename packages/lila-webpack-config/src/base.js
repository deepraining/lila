import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { defaultExtensions, defaultMinHtmlOptions } from './defaults';
import { babelLoader, htmlLoader, urlLoader } from './rules';
import { styleLoaders } from './make';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir] = getSettings(['cwd', 'src']);
  const srcPath = join(cwd, srcDir);

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
        template: `${srcPath}/${entry}/index.html`,
        minify: isBuild && minHtml ? minHtmlOptions : false,
      }),
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
        ...styleLoaders(lila, webpack, { entry, cmd, config }, isBuild),
      ],
    },
    resolve: {
      modules: [srcPath, 'node_modules'],
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
      alias,
    },
    optimization: {
      minimize: isBuild && minJs,
    },
    // cheap-source-map options don't work with uglifyjs-webpack-plugin
    devtool: noDevtool
      ? undefined
      : devtool ||
        (development ? 'cheap-module-eval-source-map' : 'module-source-map'),
    // production mode provide uglifyjs-webpack-plugin by default
    mode: development ? 'development' : 'production',
  };
};
