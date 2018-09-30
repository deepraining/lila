import webpack from 'webpack';
import webpackBundleAnalyzer from 'webpack-bundle-analyzer';

import { error, warn } from '../../../util/logger';

const { BundleAnalyzerPlugin } = webpackBundleAnalyzer;

export default (page, argv, lila) => {
  const { makeConfig } = lila;
  const config = makeConfig({ page, cmd: 'analyze' }, argv);

  const { bundleAnalyzer } = config;
  const webpackConfig = config.webpack || {};
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin(bundleAnalyzer || { analyzerPort: 8190 })
  );

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
      info.errors.forEach(error);
      process.exit(1);
    }

    if (stats.hasWarnings()) {
      info.warnings.forEach(warn);
    }
  });
};
