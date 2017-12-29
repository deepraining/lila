
var resources = require('gulp-resources');
var distData = require('./data');

// extract js&css from current handling html
module.exports = (gulp) => {
    return function extract() {
        return gulp.src(distData.currentConfig.buildPaths.copiedDev.html + '/' + distData.currentConfig.moduleHtml)
            .pipe(resources({skipNotExistingFiles: !!distData.currentConfig.skipNotExistingFiles}))
            .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.html + '/' + distData.currentConfig.moduleDir));
    }
};