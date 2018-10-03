import webpack from 'webpack';
import { error, warn } from '../../../util/logger';

export default (config, cb) => {
  webpack(config, (err, stats) => {
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

    cb();
  });
};
