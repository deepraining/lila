import path from 'path';
import forEach from 'lodash/forEach';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import dll from './dll';
import base from './base';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { DllReferencePlugin } = webpack;
  const { getSettings } = lila;
  const [cwd, srcDir, buildDir, tmpDir] = getSettings([
    'cwd',
    'src',
    'build',
    'tmp',
  ]);
  const realSrcDir = join(cwd, srcDir);
  const realBuildDir = join(cwd, buildDir);

  const { staticServer = '', minJs = !1, minCss = !1, splitJs = {} } = config;

  const dllConfigs = [];
  const dllPlugins = [];
  forEach(splitJs, (value, key) => {
    dllConfigs.push(dll(lila, webpack, { page, cmd, config }, key, value));
    dllPlugins.push(
      new DllReferencePlugin({
        manifest: join(tmpDir, `dll/${page}/${key}.json`),
      })
    );
  });

  const baseConfig = base(lila, webpack, { page, cmd, config });

  baseConfig.plugins.push(
    // css standalone
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    }),
    // insert split chunk js to html
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [{ path: 'dll', glob: '*.js', globPath: `${realBuildDir}/dll/` }],
      append: false,
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

  if (dllPlugins.length) baseConfig.plugins.push(...dllPlugins);

  const buildConfig = {
    entry: `${realSrcDir}/${page}/index.js`,
    output: {
      path: realBuildDir,
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      publicPath: `${staticServer}/${buildDir}/`,
    },
    ...baseConfig,
  };

  return [...dllConfigs, buildConfig];
};
