import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base from './base';
import { defaultExt } from './defaults';

const { join } = path;

export default ({ lila, webpack, entry, cmd, config, makeType }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [root, devDir] = getSettings(['root', 'dev']);
  const devPath = join(root, devDir);

  const baseConfig = base({ lila, webpack, entry, cmd, config, makeType });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: `${root}/${entry}/index.html`,
    })
  );

  const { ext = defaultExt } = config;

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${root}/${entry}/index.${ext}`,
    ],
    output: {
      path: devPath,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
