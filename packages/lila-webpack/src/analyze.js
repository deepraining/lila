import webpack from 'webpack';
import webpackBundleAnalyzer from 'webpack-bundle-analyzer';

const { BundleAnalyzerPlugin } = webpackBundleAnalyzer;

export default ({ entry, argv, lila }) => {
  const { getSetting, makeConfig, warn, error } = lila;
  const webpackConfigGenerator = getSetting('webpackConfigGenerator');

  if (!webpackConfigGenerator)
    throw new Error('webpackConfigGenerator not configured');

  const makeWebpackConfig = webpackConfigGenerator(webpack);

  if (typeof makeWebpackConfig !== 'function')
    throw new Error('webpackConfigGenerator should return a function');

  const config = makeConfig({ entry, cmd: 'analyze', argv });
  const webpackConfig = makeWebpackConfig({
    entry,
    argv,
    cmd: 'analyze',
    config,
    lila,
  });

  if (!webpackConfig.plugins) webpackConfig.plugins = [];

  const { bundleAnalyzer = { analyzerPort: 8190 } } = config;

  webpackConfig.plugins.push(new BundleAnalyzerPlugin(bundleAnalyzer));

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      error(err.stack || err);
      if (err.details) {
        error(err.details);
      }
      process.exit(1);
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      info.errors.forEach(e => {
        error(e);
      });
      process.exit(1);
    }

    if (stats.hasWarnings()) {
      info.warnings.forEach(warning => {
        warn(warning);
      });
    }
  });
};
