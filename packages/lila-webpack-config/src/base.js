import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { defaultExtensions, defaultMinHtmlOptions } from './defaults';
import { babelLoader, htmlLoader, urlLoader } from './rules';
import { styleLoaders } from './make';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, appDir] = getSettings(['cwd', 'src', 'app']);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);

  const { ProvidePlugin, DefinePlugin } = webpack;

  const {
    babelImport = [],
    babelExclude = [/node_modules/],
    extensions = defaultExtensions,
    provide = {},
    define = {},
    alias = {},
    minHtml = !1,
    minHtmlOptions = defaultMinHtmlOptions,
  } = config;

  const isBuild = cmd === 'build' || cmd === 'sync' || cmd === 'start';
  const development = cmd === 'dev' || cmd === 'serve';

  // todo: flow

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
        babelLoader({ babelImport, babelExclude }),
        urlLoader({ extensions }),
        htmlLoader(),
        ...styleLoaders(lila, webpack, { page, cmd, config }, isBuild),
      ],
    },
    resolve: {
      modules: [realSrcDir, 'node_modules'],
      alias,
    },
    mode: development ? 'development' : 'production',
  };
};
