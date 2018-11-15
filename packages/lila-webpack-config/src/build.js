import path from 'path';
import forEach from 'lodash/forEach';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import dll from './dll';
import base from './base';
import { defaultEntry } from '../../../util/constants';

const { join } = path;

export default (lila, webpack, { entry, cmd, config }) => {
  const { DllReferencePlugin } = webpack;
  const { getSettings } = lila;
  const [root, srcDir, buildDir, tmpDir] = getSettings([
    'root',
    'src',
    'build',
    'tmp',
  ]);
  const srcPath = join(root, srcDir);
  const buildPath = join(root, buildDir);

  const { staticServer = '', minCss = !0, splitJs = {} } = config;

  const dllConfigs = [];
  const dllPlugins = [];
  forEach(splitJs, (value, key) => {
    dllConfigs.push(dll(lila, webpack, { entry, cmd, config }, key, value));
    dllPlugins.push(
      new DllReferencePlugin({
        manifest: join(
          root,
          tmpDir,
          `dll/${entry === defaultEntry ? '' : `${entry}/`}${key}.json`
        ),
      })
    );
  });

  const baseConfig = base(lila, webpack, { entry, cmd, config });

  baseConfig.plugins.push(
    // css standalone
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    }),
    // insert split chunk js to html
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [{ path: 'dll', glob: '*.js', globPath: `${buildPath}/dll/` }],
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

  if (dllPlugins.length) baseConfig.plugins.push(...dllPlugins);

  const buildConfig = {
    entry: `${srcPath}/${entry === defaultEntry ? '' : `${entry}/`}index.js`,
    output: {
      path: buildPath,
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      publicPath: `${staticServer}/${buildDir}/`,
    },
    ...baseConfig,
  };

  return [...dllConfigs, buildConfig];
};
