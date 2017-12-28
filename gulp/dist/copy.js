
var amdOptimize = require("amd-optimize");
var distData = require('./data');
var distNext = require('./next');

module.exports = {
    /**
     * copy module required js files
     */
    copyJs: (gulp) => {
        return function copyJs(cb) {
            if (distData.currentConfig.useRequireJs) {
                var targetDirectory = distData.currentConfig.requireJsToTagLoad ?
                    distData.currentConfig.buildPaths.extract.js : distData.currentConfig.buildPaths.extractJs.js;

                return gulp.src(distData.currentConfig.buildPaths.copiedDev.js + "/**/*.js")
                    .pipe(amdOptimize(distData.currentConfig.module, {
                        baseUrl : distData.currentConfig.buildPaths.copiedDev.js,
                        configFile : distData.currentConfig.basePaths.webRoot + distData.currentConfig.requireJsConfigPath
                    }))
                    .pipe(gulp.dest(targetDirectory));
            }
            else cb();
        }
    },
    /**
     * copy module required css files
     */
    copyCss: (gulp) => {
        return function copyCss(cb) {
            if (distData.currentConfig.useInCss) {
                var targetDirectory = distData.currentConfig.inCssToTagLoad ?
                    distData.currentConfig.buildPaths.extract.css : distData.currentConfig.buildPaths.extractCss.css;

                return gulp.src(distData.currentConfig.inCssAllModulesPaths, {base: distData.currentConfig.buildPaths.copiedDev.css})
                    .pipe(gulp.dest(targetDirectory));
            }
            else cb();
        }
    },
    /**
     * copy extra modules required js files
     */
    copyExtraJs: (gulp) => {
        return function copyExtraJs (cb) {

            distNext.extraJsEntryModule();

            if (distData.currentConfig.hasExtraJsEntryModules)
                return gulp.src(distData.currentConfig.buildPaths.copiedDev.js + "/**/*.js")
                    .pipe(amdOptimize(distData.currentConfig.processingData.extraJsEntryModule, {
                        baseUrl : distData.currentConfig.buildPaths.copiedDev.js,
                        configFile : distData.currentConfig.basePaths.webRoot + distData.currentConfig.requireJsConfigPath
                    }))
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.extractJs.js));
            else cb();
        }
    },
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
    copyDirectoriesToBuildForInCss: (gulp) => {
        return function copyExtraDirectoriesOfDevForInCss (cb) {
            if (distData.currentConfig.useInCss && !distData.currentConfig.inCssToTagLoad &&
                distData.currentConfig.directoriesToBuild && distData.currentConfig.directoriesToBuild.length)
                return gulp.src(distData.currentConfig.processingData.directoriesToBuild, {
                        base: distData.currentConfig.buildPaths.dev.dir
                    })
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.extractCss.dir));
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