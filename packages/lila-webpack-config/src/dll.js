import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { babelLoader } from './rules';

const { join } = path;

export default (lila, webpack, { page, config }, key, value) => {
  const { DllPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir, appDir, tmpDir] = getSettings([
    'cwd',
    'src',
    'build',
    'app',
    'tmp',
  ]);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);
  const realBuildDir = join(realAppDir, buildDir);

  const {
    babelImport = [],
    babelExclude = [/node_modules/],
    alias = {},
    minJs = !1,
  } = config;

  const plugins = [
    new DllPlugin({
      name: 'vendor_[chunkhash]',
      path: join(tmpDir, `dll/${page}/${key}.json`),
    }),
  ];

  if (minJs)
    plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: { comments: false },
        },
      })
    );

  return {
    entry: Array.isArray(value) ? value : [value],
    output: {
      path: join(realBuildDir, 'dll'),
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      library: 'vendor_[chunkhash]',
    },
    plugins,
    module: {
      rules: [babelLoader({ babelImport, babelExclude })],
    },
    resolve: {
      modules: [realSrcDir, 'node_modules'],
      alias,
    },
    mode: 'production',
  };
};
