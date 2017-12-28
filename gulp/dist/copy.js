
var amdOptimize = require("amd-optimize");
var distData = require('./data');
var distNext = require('./next');

module.exports = {
    /**
     * copy directoriesToBuild
     */
    copyDirectoriesToBuild: (gulp) => {
        return function copyDirectoriesToBuild (cb) {
            if (distData.currentConfig.directoriesToBuild && distData.currentConfig.directoriesToBuild.length)
                return gulp.src(distData.currentConfig.processingData.directoriesToBuild, {
                        base: distData.currentConfig.buildPaths.dev.dir
                    })
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.dir));
            else cb();
        }
    },
    /**
     * copy directoriesToBuild after building
     */
    copyDirectoriesOfBuildAfterDist: (gulp) => {
        return function copyDirectoriesOfBuildAfterDist (cb) {
            if (distData.currentConfig.directoriesToBuild && distData.currentConfig.directoriesToBuild.length) {

                var completePaths = [];
                distData.currentConfig.directoriesToBuild.forEach((dir) => {
                    completePaths.push(distData.currentConfig.buildPaths.dist.dir + '/' + dir + '/**/*');
                });
                return gulp.src(completePaths, {base: distData.currentConfig.buildPaths.dist.dir})
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.distStore.dir));
            }
            else cb();
        }
    }
};