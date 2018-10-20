import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base from './base';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { HotModuleReplacementPlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, devDir, appDir] = getSettings(['cwd', 'dev', 'app']);
  const realAppDir = join(cwd, appDir);
  const realDevDir = join(realAppDir, devDir);

  const baseConfig = base(lila, webpack, { page, cmd, config });

  baseConfig.plugins.unshift(new HotModuleReplacementPlugin());
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: `${realAppDir}/${page}/index.html`,
    })
  );

  return {
    entry: [
      'webpack-hot-middleware/client?reload=true',
      `${realAppDir}/${page}/index.js`,
    ],
    output: {
      path: realDevDir,
      filename: 'index.js',
      publicPath: `/${devDir}/`,
    },
    ...baseConfig,
  };
};
