import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import base from './base';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir] = getSettings(['cwd', 'src', 'build']);
  const realSrcDir = join(cwd, srcDir);
  const realBuildDir = join(cwd, buildDir);

  const { BannerPlugin } = webpack;

  const {
    minJs = !1,
    minCss = !1,
    filename = 'index',
    library = 'Index',
    libraryTarget = 'umd',
    banner = '',
    externals,
  } = config;

  const baseConfig = base(lila, webpack, { page, cmd, config });

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

  if (minJs)
    baseConfig.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: { comments: false },
        },
      })
    );

  if (banner) baseConfig.plugins.push(new BannerPlugin(banner));

  return {
    entry:
      page === 'index'
        ? `${realSrcDir}/index.js`
        : `${realSrcDir}/${page}/index.js`,
    output: {
      path: realBuildDir,
      filename: `${filename}.js`,
      library,
      libraryTarget,
      publicPath: '',
    },
    externals,
    ...baseConfig,
  };
};
