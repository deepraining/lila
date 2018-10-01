import webpack from 'webpack';
import { error, warn } from '../../../util/logger';

export default ({ page, args, argv, cmd, config, lila }) => cb => {
  const { getSetting } = lila;
  const webpackConfigGenerator = getSetting('webpackConfigGenerator');

  if (!webpackConfigGenerator)
    throw new Error('webpackConfigGenerator not configured');

  const makeWebpackConfig = webpackConfigGenerator(webpack);

  if (typeof makeWebpackConfig !== 'function')
    throw new Error('webpackConfigGenerator should return a function');

  webpack(
    makeWebpackConfig({ page, args, argv, cmd, config, lila }),
    (err, stats) => {
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
    }
  );
};
