const logger = require('../../../util/logger');

const current = require('../current');
const addCdn = require('../util/add_cdn');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {function}
 */
module.exports = gulp => {
  return function adjustHtml(cb) {
    logger.log('Adjusting html files.', { prefix: !0, preLn: !0, postLn: !0 });

    if (!current.config.staticServerUrl) {return cb();}

    let options = {
      extensions: current.config.htmlCdnExtensions,
      rules: [],
    };

    // Just have domain, no sub dir.
    if (!current.config.staticServerDir) {
      options.rules.push({
        cdn: current.config.staticServerDomain,
      });
    }
    // Just have sub dir, no domain.
    else if (!current.config.staticServerDomain) {
      options.rules.push({
        start: current.config.staticServerDir,
        reverse: !0,
        cdn: current.config.staticServerDir,
      });
    }
    // Have both.
    else {
      options.rules.push(
        {
          start: current.config.staticServerDir,
          cdn: current.config.staticServerDomain,
        },
        {
          start: current.config.staticServerDir,
          reverse: !0,
          cdn: current.config.staticServerUrl,
        }
      );
    }

    return gulp
      .src(current.config.buildPaths.buildTmp.dir + '/**/*.html')
      .pipe(addCdn(options))
      .pipe(gulp.dest(current.config.buildPaths.buildTmp.dir));
  };
};
