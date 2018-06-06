
const _ = require('lodash');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const gap = require('gulp-append-prepend');
const distData = require('./data');

/**
 * html replacement
 */
const htmlReplace = (stream) => {
    _.forEach(distData.currentConfig.htmlReplace, (value, key) => {
        stream.pipe(replace(new RegExp(key, 'g'), value));
    });
};

/**
 * prepend or append string to html
 */
const htmlInsert = (stream) => {
    distData.currentConfig.htmlInsert.start && stream.pipe(gap.prependText(distData.currentConfig.htmlInsert.start));
    distData.currentConfig.htmlInsert.end && stream.pipe(gap.appendText(distData.currentConfig.htmlInsert.end));
};

/**
 * convert html to other kind of file
 */
const htmlExtension = (stream) => {
    stream.pipe(rename({extname: "." + distData.currentConfig.htmlExtension}));
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

        stream = gulp.src(distData.currentConfig.buildPaths.tmp.html + '/**/*.html');
        if (distData.currentConfig.hasHtmlReplace)
            htmlReplace(stream);
        if (distData.currentConfig.hasHtmlInsert)
            htmlInsert(stream);
        if (distData.currentConfig.hasHtmlExtension)
            htmlExtension(stream);

        stream.pipe(gulp.dest(distData.currentConfig.buildPaths.store.html));

        return stream;
    }
};
