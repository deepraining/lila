import webpack from 'webpack';

export default ({ entry, args, argv, cmd, config, lila }) => cb => {
  const { getSetting, error, warn } = lila;
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
