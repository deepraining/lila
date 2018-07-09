const htmlmin = require('gulp-htmlmin');

const logger = require('../../../util/logger');

const current = require('../current');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {function}
 */
module.exports = gulp => {
  return function minHtml(cb) {
    logger.log('Minimizing html files.', { prefix: !0, preLn: !0, postLn: !0 });

    if (current.config.minHtml) {
      let options = current.config.minHtmlOptions || {
        removeComments: !0,
        collapseWhitespace: !0,
        collapseBooleanAttributes: !0,
        removeEmptyAttributes: !0,
        removeScriptTypeAttributes: !0,
        removeStyleLinkTypeAttributes: !0,
        minifyJS: !1,
        minifyCSS: !0,
      };

      return gulp
        .src(current.config.buildPaths.buildTmp.dir + '/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest(current.config.buildPaths.buildTmp.dir));
    } else {cb();}
  };
};
