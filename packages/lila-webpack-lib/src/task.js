import webpack from 'webpack';
import chalk from 'chalk';
import { error, warn } from '../../../util/logger';

const { red, yellow } = chalk;

export default ({ entry, args, argv, cmd, config, lila }) => cb => {
  const { getSetting } = lila;
  const webpackConfigGenerator = getSetting('webpackConfigGenerator');

  if (!webpackConfigGenerator)
    throw new Error('webpackConfigGenerator not configured');

  const makeWebpackConfig = webpackConfigGenerator(webpack);

  if (typeof makeWebpackConfig !== 'function')
    throw new Error('webpackConfigGenerator should return a function');

  const webpackConfig = makeWebpackConfig({
    entry,
    args,
    argv,
    cmd,
    config,
    lila,
  });

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      error(red(err.stack || err));
      if (err.details) {
        error(red(err.details));
      }
      process.exit(1);
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      info.errors.forEach(e => {
        error(red(e));
      });
      process.exit(1);
    }

    if (stats.hasWarnings()) {
      info.warnings.forEach(warning => {
        warn(yellow(warning));
      });
    }

    cb();
  });
};
