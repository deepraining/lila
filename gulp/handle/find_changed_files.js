
"use strict";

var md5 = require('crypto-md5');
var path = require('path');
var rd = require('rd');
var fs = require('fs');
var _ = require('lodash');

var manifests = require('../../data/manifests');
var vars = require('../../data/vars');
var isManifest = require('../../util/is_manifest');

/**
 * find changed files
 *
 * @param dir Directory to handle
 * @param name Type name (base, js, css, ...)
 * @returns {{}}
 */
module.exports = (dir, name) => {

    // manifest file
    var manifestFile = manifests[name || 'base'];

    // manifests directory
    var manifestsDirectory = vars.projectRoot + '/manifests';

    // manifest file path
    var manifestPath = path.resolve(manifestsDirectory + '/' + manifestFile);

    // new manifest
    var newManifest = {};
    // old manifest
    var originManifest = {};
    // changed files
    var changedFiles = {};

    // if manifests directory is not exist, create it
    if (!fs.existsSync(manifestsDirectory)) fs.mkdirSync(manifestsDirectory);

    // is manifest file exist, load it.
    if (fs.existsSync(manifestPath)) originManifest = require(manifestPath);

    // read all files under dir
    rd.eachFileFilterSync(dir, (file) => {

        var filePath = path.relative(dir, file);

        if (!isManifest(filePath)) {
            var fileContent = fs.readFileSync(file);
            // record in newManifest
            fileContent && (newManifest[filePath] = md5(fileContent, 'hex'));
        }
    });

    // find out all changed files
    _.forEach(newManifest, (value, key) => {
        if (originManifest[key] !== value) {
            changedFiles[key] = value;
        }
    });

    // merge originManifest to newManifest
    _.forEach(originManifest, (value, key) => {
        if (!newManifest[key]) {
            newManifest[key] = value;
        }
    });

    // save new content to manifest file
    fs.writeFileSync(manifestPath, JSON.stringify(newManifest));

    return changedFiles;
};