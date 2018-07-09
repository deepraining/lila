const md5 = require('crypto-md5');
const path = require('path');
const rd = require('rd');
const fs = require('fs');
const forEach = require('lodash/forEach');

const manifests = require('../../../data/manifests');
const pathInfo = require('../../../data/path_info');
const isManifest = require('../../../util/is_manifest');

/**
 * Find changed files of a directory.
 *
 * @param dir Directory to find.
 * @param name Type name (base, images, ...)
 * @returns {{}}
 */
module.exports = (dir, name) => {
  // Manifest file.
  const manifestFile = manifests[name || 'base'];

  // Manifest file path.
  const manifestPath = path.join(pathInfo.manifestsDir, manifestFile);

  // New manifest.
  let newManifest = {};
  // Old manifest.
  let oldManifest = {};
  // Changed files.
  let changedFiles = {};

  // If manifests directory is not exist, create it.
  if (!fs.existsSync(pathInfo.manifestsDir)) fs.mkdirSync(pathInfo.manifestsDir);

  // If manifest file exist, load it.
  if (fs.existsSync(manifestPath)) oldManifest = require(manifestPath);

  // Read all files under dir.
  rd.eachFileFilterSync(dir, file => {
    let fileRelativePath = path.relative(dir, file);

    if (!isManifest(fileRelativePath)) {
      let fileContent = fs.readFileSync(file);
      // Record it in newManifest.
      fileContent && (newManifest[fileRelativePath] = md5(fileContent, 'hex'));
    }
  });

  // Find out all changed files.
  forEach(newManifest, (value, key) => {
    if (oldManifest[key] !== value) {
      changedFiles[key] = value;
    }
  });

  // Merge oldManifest to newManifest.
  forEach(oldManifest, (value, key) => {
    if (!newManifest[key]) {
      newManifest[key] = value;
    }
  });

  // Save new content to manifest file.
  fs.writeFileSync(manifestPath, JSON.stringify(newManifest));

  return changedFiles;
};
