
var path = require('path');
var concat = require('gulp-concat');
var cssimport = require("gulp-cssimport");
var cssUrlToAbsolute = require('gulp-css-url-to-absolute');
var distData = require('./data');
var distNext = require('./next');
var getConcatFileNme = require('../../util/get_concat_file_name');


module.exports = {
    // merge js
    concatJs: (gulp) => {
        return function concatJs(cb) {
            if (distData.currentConfig.needConcatJs) {
                distNext.concatJs();

                var group = distData.currentConfig.processingData.concatJsGroup[distData.currentConfig.processingData.concatJsKey];
                if (group && group.length)
                    return gulp.src(group)
                        .pipe(concat(getConcatFileNme(
                                distData.currentConfig.moduleName,
                                distData.currentConfig.processingData.concatJsKey
                            ) + '.js'))
                        .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.js + '/' + distData.currentConfig.moduleDir));
                else cb();
            }
            else cb();
        }
    },
    // merge css
    concatCss: (gulp) => {
        return function concatCss(cb) {
            if (distData.currentConfig.needConcatCss) {
                distNext.concatCss();

                var group = distData.currentConfig.processingData.concatCssGroup[distData.currentConfig.processingData.concatCssKey];
                if (group && group.length)
                    return gulp.src(group)
                        .pipe(cssUrlToAbsolute({
                            root: distData.currentConfig.basePaths.webRoot
                        }))
                        .pipe(concat(getConcatFileNme(
                                distData.currentConfig.moduleName,
                                distData.currentConfig.processingData.concatCssKey
                            ) + '.css'))
                        .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.css + '/' + distData.currentConfig.moduleDir));
                else cb();
            }
            else cb();
        }
    },
    // concat all css for mark @import
    concatCssForImport: (gulp) => {
        return function concatCssForImport(cb) {
            if (distData.currentConfig.useInCss) {
                distNext.inCssModule();

                var sourcePath = distData.currentConfig.buildPaths.copiedDev.css + '/' +
                    distData.currentConfig.processingData.inCssModule + '.css';
                var cssHome = distData.currentConfig.inCssToTagLoad ?
                    distData.currentConfig.buildPaths.extract.css : distData.currentConfig.buildPaths.extractCss.css;
                var targetPath = cssHome + '/' + distData.currentConfig.processingData.inCssModule + '.css';

                return gulp.src(sourcePath)
                    .pipe(cssimport({}))
                    .pipe(gulp.dest(path.dirname(targetPath)));
            }
            else cb();
        }
    }
};