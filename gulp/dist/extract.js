
var resources = require('gulp-resources');
var distData = require('./data');

module.exports = {
    // extract js&css from current handling html
    extractResources: (gulp) => {
        return function extractResources() {
            return gulp.src(distData.currentConfig.buildPaths.copiedDev.html + '/' + distData.currentConfig.moduleHtml)
                .pipe(resources({skipNotExistingFiles: !!distData.currentConfig.skipNotExistingFiles}))
                .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.html + '/' + distData.currentConfig.moduleDir));
        }
    }
};