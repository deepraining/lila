import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import base from './base';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir] = getSettings(['cwd', 'src', 'build']);
  const srcPath = join(cwd, srcDir);
  const buildPath = join(cwd, buildDir);

  const { BannerPlugin } = webpack;

  const {
    minCss = !0,
    filename = 'index',
    library = 'Index',
    libraryTarget = 'umd',
    banner = '',
    externals,
  } = config;

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  baseConfig.plugins.push(
    // css standalone
    new MiniCssExtractPlugin({
      filename: `${filename}.css`,
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

  return {
    entry:
      entry === 'index'
        ? `${srcPath}/index.js`
        : `${srcPath}/${entry}/index.js`,
    output: {
      path: buildPath,
      filename: `${filename}.js`,
      library,
      libraryTarget,
      publicPath: '',
    },
    externals,
    ...baseConfig,
  };
};
