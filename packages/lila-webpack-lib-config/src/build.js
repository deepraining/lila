import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import base from './base';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { getSettings } = lila;
  const [root, srcDir, buildDir] = getSettings(['root', 'src', 'build']);
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

  return [
    {
      path: buildPath,
      filename: `${filename ? `${filename}.` : ''}cjs.js`,
      library,
      libraryTarget: 'commonjs2',
      publicPath: '',
    },
    {
      path: buildPath,
      filename: `${filename ? `${filename}.` : ''}amd.js`,
      library,
      libraryTarget: 'amd',
      publicPath: '',
    },
    {
      path: buildPath,
      filename: `${filename ? `${filename}.` : ''}umd.js`,
      library,
      libraryTarget: 'umd',
      publicPath: '',
    },
  ].map(output => ({
    entry:
      entry === 'index'
        ? `${srcPath}/index.js`
        : `${srcPath}/${entry}/index.js`,
    output,
    externals,
    ...baseConfig,
  }));
};
