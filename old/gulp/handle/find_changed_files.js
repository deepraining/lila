
const md5 = require('crypto-md5');
const path = require('path');
const rd = require('rd');
const fs = require('fs');
const _ = require('lodash');

const manifests = require('../../data/manifests');
const vars = require('../../data/vars');
const isManifest = require('../../util/is_manifest');

/**
 * find changed files
 *
 * @param dir Directory to handle
 * @param name Type name (base, js, css, ...)
 * @returns {{}}
 */
module.exports = (dir, name) => {

    // manifest file
    const manifestFile = manifests[name || 'base'];

    // manifests directory
    const manifestsDirectory = vars.projectRoot + '/manifests';

    // manifest file path
    const manifestPath = path.resolve(manifestsDirectory + '/' + manifestFile);

    // new manifest
    const newManifest = {};
    // old manifest
    const originManifest = {};
    // changed files
    const changedFiles = {};

    // if manifests directory is not exist, create it
    if (!fs.existsSync(manifestsDirectory)) fs.mkdirSync(manifestsDirectory);

    // is manifest file exist, load it.
    if (fs.existsSync(manifestPath)) originManifest = require(manifestPath);

    // read all files under dir
    rd.eachFileFilterSync(dir, (file) => {

        const filePath = path.relative(dir, file);

        if (!isManifest(filePath)) {
            const fileContent = fs.readFileSync(file);
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
