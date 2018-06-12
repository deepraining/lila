
const webpack = require('webpack');

const logger = require('../../../util/logger');

const current = require('../current');

module.exports = function webpackBuild(cb) {
    logger.log('Start webpack building.', {prefix: !0, preLn: !0, postLn: !0});

    webpack(current.config.webpack, (err, stats) => {
        if (err) {
            logger.error(err.stack || err);
            if (err.details) {
                logger.error(err.details);
            }
            process.exit(0);
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            info.errors.forEach(error => {
                logger.error(error);
            });
            process.exit(0);
        }

        if (stats.hasWarnings()) {
            info.warnings.forEach(warning => {
                logger.warn(warning);
            });
        }

        logger.log('Finish webpack building.', {prefix: !0, preLn: !0, postLn: !0});
        cb();
    });
};
