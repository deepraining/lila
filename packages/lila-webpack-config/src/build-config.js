import path from 'path';
import forEach from 'lodash/forEach';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import { basePlugins, baseLoaders, styleLoaders, makeResolve } from './make';
import { defaultSplitJs, defaultStaticServer } from './defaults';
import dllConfig from './dll-config';

const { join } = path;

export default (lila, webpack, { page, cmd, config }) => {
  const { DllReferencePlugin } = webpack;
  const { getSettings } = lila;
  const {
    staticServer = defaultStaticServer,
    splitJs = defaultSplitJs,
  } = config;
  const [cwd, srcDir, buildDir, appDir, tmpDir] = getSettings([
    'cwd',
    'srcDir',
    'buildDir',
    'appDir',
    'tmpDir',
  ]);
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);
  const realBuildDir = join(realAppDir, buildDir);

  const dllConfigs = [];
  const dllPlugins = [];
  forEach(splitJs, (value, key) => {
    dllConfigs.push(
      dllConfig(lila, webpack, { page, cmd, config }, key, value)
    );
    dllPlugins.push(
      new DllReferencePlugin({
        manifest: join(tmpDir, `dll/${page}/${key}.json`),
      })
    );
  });

  const buildConfig = {
    entry: `${realSrcDir}/${page}/index.js`,
    output: {
      path: realBuildDir,
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      publicPath: `${staticServer}/${buildDir}/`,
    },
    plugins: [
      ...basePlugins(lila, webpack, { page, cmd, config }),
      new MiniCssExtractPlugin({
        filename: '[chunkhash].css',
      }),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          { path: 'dll', glob: '*.js', globPath: `${realBuildDir}/dll/` },
        ],
        append: false,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          output: { comments: false },
        },
      }),
      ...dllPlugins,
    ],
    module: {
      rules: [
        ...baseLoaders(lila, webpack, { page, cmd, config }),
        ...styleLoaders(lila, webpack, { page, cmd, config }),
      ],
    },
    resolve: makeResolve(lila, webpack, { page, cmd, config }),
    mode: 'production',
  };

  return [...dllConfigs, buildConfig];
};
