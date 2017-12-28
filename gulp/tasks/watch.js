
var path = require('path');
var del = require('del');
var less = require('gulp-less');
var babel = require('gulp-babel');
var commonToAmd = require('gulp-common-to-amd');

var projectConfig = require('../../project_config');
var babelPreset = require('../../data/babel_preset');
var shareData = require('../../data/share');

module.exports = (gulp) => {

    var reloadHandler = () => {
        shareData.browser && shareData.browser.reload();
    };

    var compileLess = () => {

        return gulp.src(projectConfig.buildPaths.src.css + '/**/*.less')
            .pipe(less({relativeUrls: true}))
            .pipe(gulp.dest(projectConfig.buildPaths.dev.css))
            .on('end', reloadHandler)
    };

    var compileJs = () => {

        return gulp.src(projectConfig.buildPaths.src.js + '/**/*.js')
            // es6 to es5
            .pipe(babel({
                    presets: babelPreset
                }))
            // commonjs -> amd
            .pipe(commonToAmd())
            .pipe(gulp.dest(projectConfig.buildPaths.dev.js))
            .on('end', reloadHandler)
    };

    var watchHandler = (type, file) => {
        // js/css/html
        var target = file.match(/src[\/|\\](.*?)[\/|\\]/)[1];

        switch (target) {
            case 'js':
                // is remove handling
                if (type === 'removed')
                    del([file.replace('src', 'dev')], {force: !0});
                // add or update
                else
                    compileJs();

                break;

            case 'css':

                var ext = path.extname(file);

                // is remove handling
                if (type === 'removed')
                    del([file.replace('src', 'dev').replace(ext, '.css')], {force: !0});
                // add or update
                else {
                    ext === '.less' && compileLess();
                }

                break;
        }

    };

    var watch = (cb) => {
        // get a watcher
        var watcher = gulp.watch([
                projectConfig.buildPaths.src.js + '/**/*.js',
                projectConfig.buildPaths.src.css + '/**/*.less'
            ],
            {ignored: /[\/\\]\./}
        );

        watcher
            .on('change', (file) => {
                logger.info(file + ' has been changed');
                watchHandler('changed', file);
            })
            .on('add', (file) => {
                logger.info(file + ' has been added');
                watchHandler('add', file);
            })
            .on('unlink', (file) => {
                logger.info(file + ' is deleted');
                watchHandler('removed', file);
            });

        cb();
    };

    var postHandler = (cb) => {

        logger.info('');
        logger.info('Lilacs is already watching files\' changes.');
        logger.info('Now you can add or edit file in /src directory.');
        logger.info('');

        cb();
    };

    // register watch task
    gulp.task('watch', gulp.series(watch, postHandler));
};
