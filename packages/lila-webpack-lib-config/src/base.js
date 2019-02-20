import path from 'path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import { defaultExtensions } from './defaults';
import {
  babelLoader,
  vueLoader,
  cssLoader,
  htmlLoader,
  lessLoader,
  sassLoader,
  urlLoader,
} from './rules';

const { join } = path;

export default ({ lila, webpack, cmd, config, makeType }) => {
  const { getSettings } = lila;
  const [root, srcDir] = getSettings(['root', 'src']);
  const srcPath = join(root, srcDir);

  const { ProvidePlugin, DefinePlugin } = webpack;

  const {
    babelImport = [],
    babelComponent = [],
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
    plugins: [
      new ProvidePlugin(provide),
      new DefinePlugin(define),
      new VueLoaderPlugin(),
    ],
    module: {
      rules: [
        ...babelLoader({
          makeType,
          babelImport,
          babelComponent,
          babelExclude,
          babelPresets,
          babelPlugins,
          flow,
          flowRuntime,
        }),
        vueLoader(),
        urlLoader({ extensions }),
        htmlLoader(),
        cssLoader(isBuild),
        lessLoader(isBuild),
        sassLoader(isBuild),
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
    devtool: devtool || (development ? 'eval-source-map' : 'source-map'),
    // production mode provide uglifyjs-webpack-plugin by default
    mode: development ? 'development' : 'production',
  };
};
