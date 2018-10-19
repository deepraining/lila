import path from 'path';
import base from './base';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, srcDir, devDir, appDir] = getSettings([
    'cwd',
    'src',
    'dev',
    'app',
  ]);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);
  const realDevDir = join(realAppDir, devDir);

  const baseConfig = base(lila, webpack, { page, cmd, config });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());

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
    ...baseConfig,
  };
};
