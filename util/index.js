import fs from 'fs';
import path from 'path';

const { statSync, existsSync } = fs;
const { join } = path;

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
    const stat = statSync(file);

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
    const stat = statSync(dir);

    return stat.isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') return !1;

    throw new Error(err);
  }
};

/**
 * Replace back slash with slash.
 *
 * @example
 *
 * ```
 * \\ -> /
 * \\\\ -> /
 * ```
 *
 * @param str
 * @returns {string}
 */
export const correctSlash = str => str.replace(/(\\\\|\\)/g, '/');

/**
 * Treat all request methods as `GET` method.
 * @param req
 * @param res
 * @param next
 */
export const forceGet = (req, res, next) => {
  req.method = 'GET';
  next();
};

/**
 * api mock
 *
 * @param root
 * @returns {function(*=, *=, *)}
 */
export const makeMock = root => (req, res, next) => {
  // path/to/index/?key1=value1
  let url = req.url.split('?')[0];

  if (url.slice(-1) === '/') url = url.slice(0, -1);

  // Don't have `.`
  if (
    url
      .split('/')
      .slice(-1)[0]
      .indexOf('.') < 0
  ) {
    const filePath = join(root, `${url}.js`);
    if (existsSync(filePath)) {
      // Disable cache.
      if (require.cache[filePath]) delete require.cache[filePath];
      require(filePath)(req, res); // eslint-disable-line
      return;
    }
  }

  next();
};
