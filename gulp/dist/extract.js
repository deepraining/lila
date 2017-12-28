
var resources = require('gulp-resources');
var distData = require('./data');
var handleJsResourcesOfHtml = require('../handle/js_resources_of_html');
var handleCssResourcesOfHtml = require('../handle/css_resources_of_html');

module.exports = {
    // extract js&css from current handling html
    extractResources: (gulp) => {
        return function extractResources() {
            return gulp.src(distData.currentConfig.buildPaths.copiedDev.html + '/' + distData.currentConfig.moduleHtml)
                .pipe(resources({skipNotExistingFiles: !!distData.currentConfig.skipNotExistingFiles}))
                .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.html + '/' + distData.currentConfig.moduleDir));
        }
    },
    // extract js&css to concat
    extractResourcesToConcat: (cb) =>  {
        if (distData.currentConfig.needConcatJs) {
            handleJsResourcesOfHtml(distData.currentConfig);
        }
        if (distData.currentConfig.needConcatCss) {
            handleCssResourcesOfHtml(distData.currentConfig);
        }
        cb();
    }
};