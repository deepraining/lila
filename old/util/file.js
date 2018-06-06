
const fs = require('fs');

const fileUtil = {
    /**
     * check directory is exist
     *
     * @param dirPath
     * @returns {boolean}
     */
    dirExist: (dirPath) => {
        try {
            const stat = fs.statSync(dirPath);

            return stat.isDirectory();
        } catch (err) {

            if (err.code === 'ENOENT') return !1;
            else throw new Error(err);
        }
    },
    /**
     * check file is exist
     *
     * @param filePath
     * @returns {boolean}
     */
    fileExist: (filePath) => {
        try {
            const stat = fs.statSync(filePath);

            return stat.isFile();
        } catch (err) {

            if (err.code === 'ENOENT') return !1;
            else throw new Error(err);
        }
    }
};

module.exports = fileUtil;
