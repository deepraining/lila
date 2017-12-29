
var fsExtra = require('fs-extra');
var _ = require('lodash');
var rd = require('rd');
var vars = require('../../data/vars');
var pathUtil = require('../../util/path');
var extractHashCodes = require('../../util/extract_hash_codes');
var cleanData = require('../../data/clean');
var cleanMatches = require('../../util/clean_matches');

module.exports = (gulp) => {

    // here should be named function, otherwise in the command line will show anonymous function
    var doClean = (cb) => {

        // all hash codes
        var hashCodes = _.uniq(extractHashCodes(cleanData.config.hashLength));
        var deletedFilesCount = 0;

        var doDelete = (dir) => {
            rd.eachFileFilterSync(dir, (file) => {
                // file path
                var filePath = pathUtil.replaceBackSlash(file);
                var lastSlashIndex = filePath.lastIndexOf('/');
                var fileName = lastSlashIndex == -1 ? filePath: filePath.slice(lastSlashIndex + 1);

                var regExp = cleanMatches.newFileName(cleanData.config.hashLength);
                var result = regExp.exec(fileName);
                if (!result) return;

                // not in use, remove it
                if (hashCodes.indexOf(result[1]) < 0) {
                    fsExtra.removeSync(file);
                    logger.info('deleted file: ' + file);
                    deletedFilesCount += 1;
                }
            });
        };

        // css directory
        doDelete(vars.projectRoot + '/dist/css');
        // js directory
        doDelete(vars.projectRoot + '/dist/js');

        logger.success(`${deletedFilesCount} redundant files are deleted successfully.`, !0, !0);

        cb();
    };

    // register clean task
    gulp.task('clean', gulp.series('pre_archive', doClean));
};
