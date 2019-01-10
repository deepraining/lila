import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackBar from 'webpackbar';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import base from './base';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [root, srcDir, buildDir] = getSettings(['root', 'src', 'build']);
  const srcPath = join(root, srcDir);
  const buildPath = join(root, buildDir);

  const { staticServer = '', minCss = !0 } = config;

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  baseConfig.plugins.push(
    new WebpackBar(),
    new SpeedMeasurePlugin(),
    // css standalone
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    })
  );

  if (minCss)
    baseConfig.plugins.push(
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      })
    );

  return {
    entry: `${srcPath}/${entry === defaultEntry ? '' : `${entry}/`}index.js`,
    output: {
      path: buildPath,
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      publicPath: `${staticServer}/${buildDir}/`,
    },
    ...baseConfig,
  };
};
