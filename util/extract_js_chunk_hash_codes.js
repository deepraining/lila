
'use strict';

const fs = require('fs');
const rd = require('rd');
const vars = require('../data/vars');

const data = require('../data');
const pathUtil = require('./path');
const cleanMatches = require('./clean_matches');

module.exports = () => {

    let hashCodes = [];

    let dir = vars.projectRoot + '/dist';
    let testRegExp = cleanMatches.jsFileName(data.hashDigestLength);

    // find all file and extract hash codes.
    fs.existsSync(dir) && rd.eachFileFilterSync(dir, file => {
        // file path
        let filePath = pathUtil.replaceBackSlash(file);
        if (!testRegExp.test(filePath)) return;

        // file content
        let content = fs.readFileSync(file);

        let regExp = cleanMatches.jsChunkContent(data.hashDigestLength);
        let result;
        while(result = regExp.exec(content)) {
            hashCodes.push(result[1]);
        }
    });

    return hashCodes;
};