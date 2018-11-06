import path from 'path';
import base from './base';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, srcDir, devDir] = getSettings(['cwd', 'src', 'dev']);
  const srcPath = join(cwd, srcDir);
  const devPath = join(cwd, devDir);

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${srcPath}/${entry}/index.js`,
    ],
    output: {
      path: devPath,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
