import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base from './base';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, devDir] = getSettings(['cwd', 'dev']);
  const realDevDir = join(cwd, devDir);

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: `${cwd}/${entry}/index.html`,
    })
  );

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${cwd}/${entry}/index.js`,
    ],
    output: {
      path: realDevDir,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
