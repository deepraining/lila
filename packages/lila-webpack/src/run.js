import webpack from 'webpack';
import chalk from 'chalk';
import { error, warn } from '../../../util/logger';

const { red, yellow } = chalk;

export default (config, cb) => {
  webpack(config, (err, stats) => {
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
