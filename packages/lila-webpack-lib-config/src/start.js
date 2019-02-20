import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base from './base';

const { join } = path;

export default ({ lila, webpack, entry, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [root, devDir] = getSettings(['root', 'dev']);
  const devPath = join(root, devDir);

  const baseConfig = base({ lila, webpack, entry, cmd, config });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: `${root}/${entry}/index.html`,
    })
  );

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${root}/${entry}/index.js`,
    ],
    output: {
      path: devPath,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
