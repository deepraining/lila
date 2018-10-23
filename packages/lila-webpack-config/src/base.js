import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { defaultExtensions, defaultMinHtmlOptions } from './defaults';
import { babelLoader, htmlLoader, urlLoader } from './rules';
import { styleLoaders } from './make';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir] = getSettings(['cwd', 'src']);
  const realSrcDir = join(cwd, srcDir);

  const { ProvidePlugin, DefinePlugin } = webpack;

  const {
    babelImport = [],
    babelExclude = [/node_modules/],
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
        template: `${realSrcDir}/${page}/index.html`,
        minify: isBuild && minHtml ? minHtmlOptions : false,
      }),
    ],
    module: {
      rules: [
        babelLoader({ babelImport, babelExclude, flow, flowRuntime }),
        urlLoader({ extensions }),
        htmlLoader(),
        ...styleLoaders(lila, webpack, { page, cmd, config }, isBuild),
      ],
    },
    resolve: {
      modules: [realSrcDir, 'node_modules'],
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
