import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackBar from 'webpackbar';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import base from './base';
import { defaultSplitChunks } from './defaults';

const { join } = path;

export default ({ lila, webpack, entry, cmd, config, makeType }) => {
  const { getSettings } = lila;
  const [root, srcDir, buildDir, defaultEntry] = getSettings([
    'root',
    'src',
    'build',
    'defaultEntry',
  ]);
  const srcPath = join(root, srcDir);
  const buildPath = join(root, buildDir);

  const {
    staticServer = '',
    minCss = !0,
    splitChunks = defaultSplitChunks,
  } = config;

  const baseConfig = base({ lila, webpack, entry, cmd, config, makeType });

  baseConfig.plugins.push(
    new WebpackBar(),
    new SpeedMeasurePlugin(),
    // css standalone
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    })
  );

  baseConfig.optimization.splitChunks = splitChunks;

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
