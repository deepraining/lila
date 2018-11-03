import path from 'path';
import { defaultExtensions } from './defaults';
import {
  babelLoader,
  cssLoader,
  htmlLoader,
  lessLoader,
  sassLoader,
  urlLoader,
} from './rules';

const { join } = path;

export default (lila, webpack, { cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir] = getSettings(['cwd', 'src']);
  const realSrcDir = join(cwd, srcDir);

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
    flow = !1,
    flowRuntime = !1,
    minJs = !0,
    devtool,
  } = config;

  const isBuild = cmd === 'build';
  const development = cmd === 'start';

  return {
    plugins: [new ProvidePlugin(provide), new DefinePlugin(define)],
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
        cssLoader(isBuild),
        lessLoader(isBuild),
        sassLoader(isBuild),
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
    devtool:
      devtool ||
      (development ? 'cheap-module-eval-source-map' : 'module-source-map'),
    // production mode provide uglifyjs-webpack-plugin by default
    mode: development ? 'development' : 'production',
  };
};
