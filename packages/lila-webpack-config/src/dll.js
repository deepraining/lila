import path from 'path';
import { babelLoader } from './rules';

const { join } = path;

export default (lila, webpack, { page, config }, key, value) => {
  const { DllPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir, tmpDir] = getSettings([
    'cwd',
    'src',
    'build',
    'tmp',
  ]);
  const realSrcDir = join(cwd, srcDir);
  const realBuildDir = join(cwd, buildDir);

  const {
    babelImport = [],
    babelExclude = [/node_modules/],
    alias = {},
    minJs = !0,
    devtool,
  } = config;

  const plugins = [
    new DllPlugin({
      name: 'vendor_[chunkhash]',
      path: join(tmpDir, `dll/${page}/${key}.json`),
    }),
  ];

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
    optimization: {
      minimize: minJs,
    },
    devtool: devtool || 'module-source-map',
    mode: 'production',
  };
};
