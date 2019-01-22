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
  const [root, srcDir, buildDir, packages = !1] = getSettings([
    'root',
    'src',
    'build',
    'packages',
  ]);
  const srcPath = join(root, srcDir);
  const buildPath = join(root, buildDir);

  const { BannerPlugin } = webpack;

  const {
    minCss = !0,
    filename = '',
    library = 'Index',
    banner = '',
    externals,
  } = config;

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  baseConfig.plugins.push(
    new WebpackBar(),
    new SpeedMeasurePlugin(),
    // css standalone
    new MiniCssExtractPlugin({
      filename: `${filename || 'style'}.css`,
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

  if (banner) baseConfig.plugins.push(new BannerPlugin(banner));

  let entryPath =
    entry === defaultEntry
      ? `${srcPath}/index.js`
      : `${srcPath}/${entry}/index.js`;
  let outputPath = entry === defaultEntry ? buildPath : join(buildPath, entry);

  if (packages) {
    const packagesDir = typeof packages === 'string' ? packages : 'packages';
    entryPath = join(root, packagesDir, entry, srcDir, 'index.js');
    outputPath = join(root, packagesDir, entry, buildDir);
  }

  return [
    {
      path: outputPath,
      filename: `${filename ? `${filename}.` : ''}cjs.js`,
      library,
      libraryTarget: 'commonjs2',
      publicPath: '',
    },
    {
      path: outputPath,
      filename: `${filename ? `${filename}.` : ''}amd.js`,
      library,
      libraryTarget: 'amd',
      publicPath: '',
    },
    {
      path: outputPath,
      filename: `${filename ? `${filename}.` : ''}umd.js`,
      library,
      libraryTarget: 'umd',
      publicPath: '',
    },
  ].map(output => ({
    entry: entryPath,
    output,
    externals,
    ...baseConfig,
  }));
};
