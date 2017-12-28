
module.exports = (gulp) => {

    // register cp task
    gulp.task('cp', gulp.series('compile'));
};
