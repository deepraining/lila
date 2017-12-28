
var revDel = require('gulp-rev-delete-original');
var distData = require('./data');
var manifests = require('../../data/manifests');

var newRevAll = require('../../util/new_rev_all');

module.exports = {
    revisionBase: (gulp) => {
        return function revisionBase(cb) {
            var revAll = newRevAll(manifests.base, distData.currentConfig.revisionHashLength);

            if (distData.currentConfig.revisionFiles) {
                return gulp.src([distData.currentConfig.buildPaths.extract.dir + '/**/*'])
                    .pipe(revAll.revision())
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.dir))
                    .pipe(revDel({exclude: /(.html|.htm)$/}))
                    .pipe(revAll.manifestFile())
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.extract.dir));
            }
            else cb();
        }
    }
};