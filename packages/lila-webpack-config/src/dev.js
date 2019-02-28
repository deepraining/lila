import path from 'path';
import base from './base';
import { defaultEntry } from '../../../util/constants';
import { defaultExt } from './defaults';

const { join } = path;

export default ({ lila, webpack, entry, cmd, config, makeType }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [root, srcDir, devDir] = getSettings(['root', 'src', 'dev']);
  const srcPath = join(root, srcDir);
  const devPath = join(root, devDir);

  const baseConfig = base({ lila, webpack, entry, cmd, config, makeType });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());

  const { ext = defaultExt } = config;

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${srcPath}/${entry === defaultEntry ? '' : `${entry}/`}index.${ext}`,
    ],
    output: {
      path: devPath,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
