import webpack from 'webpack';

export default (lila, config, cb) => {
  const { error, warn } = lila;

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

    cb();
  });
};
