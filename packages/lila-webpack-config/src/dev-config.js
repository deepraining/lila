import path from 'path';
import {
  basePlugins,
  baseLoaders,
  makeStyleLoaders,
  makeResolve,
} from './make';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, srcDir, devDir, appDir] = getSettings([
    'cwd',
    'srcDir',
    'devDir',
    'appDir',
  ]);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);
  const realDevDir = join(realAppDir, devDir);

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${realSrcDir}/${page}/index.js`,
    ],
    output: {
      path: realDevDir,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      ...basePlugins(lila, webpack, { page, cmd, config }),
    ],
    module: {
      rules: [
        ...baseLoaders(lila, webpack, { page, cmd, config }),
        ...makeStyleLoaders(lila, webpack, { page, cmd, config }),
      ],
    },
    resolve: makeResolve(lila, webpack, { page, cmd, config }),
    mode: 'development',
  };
};
