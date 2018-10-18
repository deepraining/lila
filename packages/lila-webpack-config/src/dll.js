import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { basePlugins, baseLoaders, makeResolve } from './make';

const { join } = path;

export default (lila, webpack, { page, cmd, config }, key, value) => {
  const { DllPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, buildDir, appDir, tmpDir] = getSettings([
    'cwd',
    'buildDir',
    'appDir',
    'tmpDir',
  ]);
  const realAppDir = join(cwd, appDir);
  const realBuildDir = join(realAppDir, buildDir);

  return {
    entry: Array.isArray(value) ? value : [value],
    output: {
      path: join(realBuildDir, 'dll'),
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      library: 'vendor_[chunkhash]',
    },
    plugins: [
      ...basePlugins(lila, webpack, { page, cmd, config }),
      new DllPlugin({
        name: 'vendor_[chunkhash]',
        path: join(tmpDir, `dll/${page}/${key}.json`),
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          output: { comments: false },
        },
      }),
    ],
    module: {
      rules: [...baseLoaders(lila, webpack, { page, cmd, config })],
    },
    resolve: makeResolve(lila, webpack, { page, cmd, config }),
    mode: 'production',
  };
};
