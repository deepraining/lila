
'use strict';

module.exports = (gulp) => {

    // register dev task
    gulp.task('dev', gulp.series('watch', 'server'));
};
