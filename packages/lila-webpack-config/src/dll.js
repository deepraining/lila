import path from 'path';
import { babelLoader } from './rules';

const { join } = path;

export default (lila, webpack, { entry, config }, key, value) => {
  const { DllPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir, tmpDir] = getSettings([
    'cwd',
    'src',
    'build',
    'tmp',
  ]);
  const srcPath = join(cwd, srcDir);
  const buildPath = join(cwd, buildDir);

  const {
    babelImport = [],
    babelExclude = [/node_modules/],
    babelPresets = [],
    babelPlugins = [],
    alias = {},
    flow = !1,
    flowRuntime = !1,
    minJs = !0,
    devtool,
  } = config;

  const plugins = [
    new DllPlugin({
      name: 'vendor_[chunkhash]',
      path: join(cwd, tmpDir, `dll/${entry}/${key}.json`),
    }),
  ];

  return {
    entry: Array.isArray(value) ? value : [value],
    output: {
      path: join(buildPath, 'dll'),
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      library: 'vendor_[chunkhash]',
    },
    plugins,
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
      ],
    },
    resolve: {
      modules: [srcPath, 'node_modules'],
      alias,
    },
    optimization: {
      minimize: minJs,
    },
    devtool: devtool || 'module-source-map',
    mode: 'production',
  };
};
