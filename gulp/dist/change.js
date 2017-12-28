
var _ = require('lodash');
var distData = require('./data');
var findChangedFiles = require('../handle/find_changed_files');

module.exports = {
    findChangedBase: (gulp) => {
        return function findChangedBase(cb) {

            // do not record files' changes
            if (!distData.currentConfig.recordFileChanges) {
                return gulp.src(distData.currentConfig.buildPaths.extract.dir + '/**/*', {
                        base: distData.currentConfig.buildPaths.extract.dir
                    })
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.dist.dir));
            }
            // record files' changes
            else {
                // get changed files
                var changedFiles = findChangedFiles(distData.currentConfig.buildPaths.extract.dir, 'base');
                var completeChangedFiles = [];

                if (!_.isEmpty(changedFiles)) {

                    _.forEach(changedFiles, (value, key) => {
                        completeChangedFiles.push(distData.currentConfig.buildPaths.extract.dir + '/' + key);
                        logger.info('changed: ' + key);
                    });

                    return gulp.src(completeChangedFiles, {base: distData.currentConfig.buildPaths.extract.dir})
                        .pipe(gulp.dest(distData.currentConfig.buildPaths.dist.dir));

                } else {
                    logger.log('Base nothing changed!');
                    cb();
                }
            }

        }
    },
    findChangedJs: (gulp) => {
        return function findChangedJs(cb) {
            if (distData.currentConfig.useRequireJs && (
                !distData.currentConfig.requireJsToTagLoad || distData.currentConfig.hasExtraJsEntryModules
                )) {

                // do not record files' changes
                if (!distData.currentConfig.recordFileChanges) {
                    return gulp.src(distData.currentConfig.buildPaths.extractJs.dir + '/**/*', {
                            base: distData.currentConfig.buildPaths.extractJs.dir
                        })
                        .pipe(gulp.dest(distData.currentConfig.buildPaths.dist.dir));
                }
                // record files' changes
                else {
                    // get changed files
                    var changedFiles = findChangedFiles(distData.currentConfig.buildPaths.extractJs.dir, 'js');
                    var completeChangedFiles = [];

                    if (!_.isEmpty(changedFiles)) {

                        _.forEach(changedFiles, (item, key) => {
                            completeChangedFiles.push(distData.currentConfig.buildPaths.extractJs.dir + '/' + key);
                            logger.info('changed: ' + key);
                        });

                        return gulp.src(completeChangedFiles, {base: distData.currentConfig.buildPaths.extractJs.dir})
                            .pipe(gulp.dest(distData.currentConfig.buildPaths.dist.dir));

                    } else {
                        logger.log('Js nothing changed!');
                        cb();
                    }
                }
            }

            else cb();

        }
    },
    findChangedCss: (gulp) => {
        return function findChangedCss(cb) {

            if (distData.currentConfig.useInCss && !distData.currentConfig.inCssToTagLoad) {

                // do not record files' changes
                if (!distData.currentConfig.recordFileChanges) {
                    return gulp.src(distData.currentConfig.buildPaths.extractCss.dir + '/**/*', {
                            base: distData.currentConfig.buildPaths.extractCss.dir
                        })
                        .pipe(gulp.dest(distData.currentConfig.buildPaths.dist.dir));
                }
                // record files' changes
                else {
                    // get changed files
                    var changedFiles = findChangedFiles(distData.currentConfig.buildPaths.extractCss.dir, 'css');
                    var completeChangedFiles = [];

                    if (!_.isEmpty(changedFiles)) {

                        _.forEach(changedFiles, (item, key) => {
                            completeChangedFiles.push(distData.currentConfig.buildPaths.extractCss.dir + '/' + key);
                            logger.info('changed: ' + key);
                        });

                        return gulp.src(completeChangedFiles, {base: distData.currentConfig.buildPaths.extractCss.dir})
                            .pipe(gulp.dest(distData.currentConfig.buildPaths.dist.dir));

                    } else {
                        logger.log('Css nothing changed!');
                        cb();
                    }
                }
            }
            else cb();
        }
    }
};