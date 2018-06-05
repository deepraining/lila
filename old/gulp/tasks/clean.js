
const fsExtra = require('fs-extra');
const _ = require('lodash');
const rd = require('rd');
const data = require('../../data');
const vars = require('../../data/vars');
const pathUtil = require('../../util/path');
const extractHashCodes = require('../../util/extract_hash_codes');
const extractJsChunkHashCodes = require('../../util/extract_js_chunk_hash_codes');
const cleanMatches = require('../../util/clean_matches');

module.exports = (gulp) => {

    // here should be named function, otherwise in the command line will show anonymous function
    let doClean = (cb) => {

        // all hash codes
        let hashCodes = _.uniq(extractHashCodes());
        let deletedFilesCount = 0;

        rd.eachFileFilterSync(vars.projectRoot + '/dist', file => {
            // only clean js and css file
            if (file.slice(-3) !== '.js' && file.slice(-4) !== '.css') return;

            // file path
            let filePath = pathUtil.replaceBackSlash(file);
            let lastSlashIndex = filePath.lastIndexOf('/');
            let fileName = lastSlashIndex === -1 ? filePath: filePath.slice(lastSlashIndex + 1);

            let regExp = cleanMatches.newFileName(data.hashDigestLength);
            let result = regExp.exec(fileName);
            if (!result) return;

            // not in use, remove it
            if (hashCodes.indexOf(result[1]) < 0) {
                fsExtra.removeSync(file);
                logger.info('deleted file: ' + file);
                deletedFilesCount += 1;
            }
        });

        logger.success(`${deletedFilesCount} redundant files are deleted successfully.`, !0, !0);

        cb();
    };


    /**
     * clean js chunks caused by `require.ensure(), import()`
     *
     * common js file: ([0-9a-f]{32}).js
     * chunk js file: ([0-9]{1,}).([0-9a-f]{32}).js
     *
     * and in common file, load chunk file as follows:
     *     script.src = __webpack_require__.p + "" + chunkId + "." + {"0":"7b7c4210539c2c41354207f419ec0249","1":"721ea8e8a5ae693fd7ed70b501c7d28c","2":"e2025f09faac9dd460cbac6913cfbda6"}[chunkId] + ".js";
     *
     * @param cb
     */
    let doCleanChunks = (cb) => {

        // all hash codes
        let hashCodes = _.uniq(extractJsChunkHashCodes());
        let testRegExp = cleanMatches.jsChunkFileName(data.hashDigestLength);
        let deletedFilesCount = 0;

        rd.eachFileFilterSync(vars.projectRoot + '/dist', file => {
            // file path
            let filePath = pathUtil.replaceBackSlash(file);
            if (!testRegExp.test(filePath)) return;

            let lastSlashIndex = filePath.lastIndexOf('/');
            let fileName = lastSlashIndex === -1 ? filePath: filePath.slice(lastSlashIndex + 1);

            let hash = fileName.split('.')[1];

            // not in use, remove it
            if (hashCodes.indexOf(hash) < 0) {
                fsExtra.removeSync(file);
                logger.info('deleted js chunk file: ' + file);
                deletedFilesCount += 1;
            }
        });

        logger.success(`${deletedFilesCount} redundant js chunk files are deleted successfully.`, !0, !0);

        cb();
    };

    // register clean task
    gulp.task('clean', gulp.series('pre_archive', doClean, doCleanChunks));
};
