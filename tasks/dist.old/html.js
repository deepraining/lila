
const _ = require('lodash');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const gap = require('gulp-append-prepend');
const data = require('./data');

/**
 * html replacement
 */
const htmlReplace = (stream) => {
    _.forEach(current.config.htmlReplace, (value, key) => {
        stream.pipe(replace(new RegExp(key, 'g'), value));
    });
};

/**
 * prepend or append string to html
 */
const htmlInsert = (stream) => {
    current.config.htmlInsert.start && stream.pipe(gap.prependText(current.config.htmlInsert.start));
    current.config.htmlInsert.end && stream.pipe(gap.appendText(current.config.htmlInsert.end));
};

/**
 * convert html to other kind of file
 */
const htmlExtension = (stream) => {
    stream.pipe(rename({extname: "." + current.config.htmlExtension}));
};

/**
 * 1. replacement
 * 2. insertion
 * 3. converting
 *
 * all the 3 steps must do in one time
 */
module.exports = (gulp) => {
    return function htmlHandle() {
        const stream;

        stream = gulp.src(current.config.buildPaths.tmp.html + '/**/*.html');
        if (current.config.hasHtmlReplace)
            htmlReplace(stream);
        if (current.config.hasHtmlInsert)
            htmlInsert(stream);
        if (current.config.hasHtmlExtension)
            htmlExtension(stream);

        stream.pipe(gulp.dest(current.config.buildPaths.store.html));

        return stream;
    }
};
