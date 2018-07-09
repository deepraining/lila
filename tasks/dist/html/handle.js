const forEach = require('lodash/forEach');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const gap = require('gulp-append-prepend');

const logger = require('../../../util/logger');

const current = require('../current');

/**
 * Html replacement.
 */
const htmlReplace = stream => {
  forEach(current.config.htmlReplace, (value, key) => {
    stream.pipe(replace(new RegExp(key, 'g'), value));
  });
};

/**
 * Prepend or append string to html.
 */
const htmlInsert = stream => {
  current.config.htmlInsert.start && stream.pipe(gap.prependText(current.config.htmlInsert.start));
  current.config.htmlInsert.end && stream.pipe(gap.appendText(current.config.htmlInsert.end));
};

/**
 * Convert html to other extension file.
 */
const htmlExtension = stream => {
  stream.pipe(rename({ extname: '.' + current.config.htmlExtension }));
};

/**
 * * Handle html file.
 *
 * 1. Replacement.
 * 2. Insertion.
 * 3. Converting.
 *
 * All the 3 steps must do in one time.
 *
 * @param gulp
 * @returns {function}
 */
module.exports = gulp => {
  return function handleHtml(cb) {
    logger.log('Handling html files.', { prefix: !0, preLn: !0, postLn: !0 });

    if (!current.config.hasHtmlReplace && !current.config.hasHtmlInsert && !current.config.hasHtmlExtension)
    {return cb();}

    let stream = gulp.src(current.config.buildPaths.buildTmp.html + '/**/*.html');
    if (current.config.hasHtmlReplace) {htmlReplace(stream);}
    if (current.config.hasHtmlInsert) {htmlInsert(stream);}
    if (current.config.hasHtmlExtension) {htmlExtension(stream);}

    stream.pipe(gulp.dest(current.config.buildPaths.buildStore.html));

    return stream;
  };
};
