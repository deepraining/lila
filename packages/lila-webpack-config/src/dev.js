import path from 'path';
import base from './base';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [root, srcDir, devDir] = getSettings(['root', 'src', 'dev']);
  const srcPath = join(root, srcDir);
  const devPath = join(root, devDir);

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${srcPath}/${entry === defaultEntry ? '' : `${entry}/`}index.js`,
    ],
    output: {
      path: devPath,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
