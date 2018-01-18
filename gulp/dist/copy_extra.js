
var distData = require('./data');

module.exports = {
    /**
     * resources of building, like images, fonts
     *
     */
    copyBuildResources: (gulp) => {
        return function copyBuildResources() {
            var dir = distData.currentConfig.buildPaths.copiedDev.js +
                (distData.currentConfig.moduleDir ? '/' + distData.currentConfig.moduleDir : '');
            return gulp.src([dir + '/**/*', '!**/*.js'])
                .pipe(gulp.dest(distData.currentConfig.buildPaths.resources.buildDir));
        }
    }
};