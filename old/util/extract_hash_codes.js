
'use strict';

const fs = require('fs');
const rd = require('rd');
const vars = require('../data/vars');
const data = require('../data');
const cleanMatches = require('./clean_matches');

module.exports = () => {

    let hashCodes = [];

    let htmlDirectory = vars.projectRoot + '/dist/html';

    // find all file and extract hash codes.
    fs.existsSync(htmlDirectory) && rd.eachFileFilterSync(htmlDirectory, file => {
        // file content
        let content = fs.readFileSync(file);

        let regExp = cleanMatches.newContent(data.hashDigestLength);
        let result;
        while(result = regExp.exec(content)) {
            hashCodes.push(result[1]);
        }
    });

    return hashCodes;
};