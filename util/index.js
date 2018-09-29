import fs from 'fs';

/**
 * Test is url or not.
 * @param url
 * @returns {boolean}
 */
export const isUrl = url =>
  url.slice(0, 7) === 'http://' ||
  url.slice(0, 8) === 'https://' ||
  url.slice(0, 2) === '//';

/**
 * Test is file or not.
 * @param file
 * @returns {*}
 */
export const isFile = file => {
  try {
    const stat = fs.statSync(file);

    return stat.isFile();
  } catch (err) {
    if (err.code === 'ENOENT') return !1;

    throw new Error(err);
  }
};

/**
 * Test is directory or not.
 * @param dir
 * @returns {*}
 */
export const isDir = dir => {
  try {
    const stat = fs.statSync(dir);

    return stat.isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') return !1;

    throw new Error(err);
  }
};
