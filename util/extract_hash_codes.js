
'use strict';

var fs = require('fs');
var rd = require('rd');
var vars = require('../data/vars');
var cleanMatches = require('./clean_matches');

module.exports = () => {

    var hashCodes = [];

    var htmlDirectory = vars.projectRoot + '/dist/html';

    // find all file and extract hash codes.
    fs.existsSync(htmlDirectory) && rd.eachFileFilterSync(htmlDirectory, (file) => {
        // file content
        var content = fs.readFileSync(file);

        var regExp = cleanMatches.newContent(32);
        var result;
        while(result = regExp.exec(content)) {
            hashCodes.push(result[1]);
        }
    });

    return hashCodes;
};