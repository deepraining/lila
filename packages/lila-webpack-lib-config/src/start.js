import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base from './base';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, devDir] = getSettings(['cwd', 'dev']);
  const realDevDir = join(cwd, devDir);

  const baseConfig = base(lila, webpack, { page, cmd, config });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: `${cwd}/${page}/index.html`,
    })
  );

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${cwd}/${page}/index.js`,
    ],
    output: {
      path: realDevDir,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
