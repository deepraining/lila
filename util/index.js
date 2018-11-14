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

const tryMock = ({ root, url, req, res }) => {
  // url: `/one/two/three`
  const urls = url.split('/');

  // has `.`
  if (urls[urls.length - 1].indexOf('.') > -1) return !1;

  // first try `/one/two/three.js`
  const filePath = join(root, `${url}.js`);
  if (existsSync(filePath)) {
    // disable cache
    if (require.cache[filePath]) delete require.cache[filePath];

    const fn = require(filePath); // eslint-disable-line
    if (typeof fn === 'function') {
      fn(req, res);
      return !0;
    }
  }

  // second try `/one/two.js` `{three}`
  const parentFilePath = join(root, `${urls.slice(0, -1).join('/')}.js`);
  if (existsSync(parentFilePath)) {
    // disable cache
    if (require.cache[parentFilePath]) delete require.cache[parentFilePath];

    const exp = require(parentFilePath); // eslint-disable-line
    const fn = exp[urls[urls.length - 1]];

    if (typeof fn === 'function') {
      fn(req, res);
      return !0;
    }
  }

  return !1;
};

/**
 * api mock
 *
 * @param root
 * @param mockRoot
 * @returns {function(*=, *=, *)}
 */
export const makeMock = (root, mockRoot = '') => (req, res, next) => {
  // `/one/two/three/?key1=value1`
  let url = req.url.split('?')[0];

  if (url.slice(-1) === '/') url = url.slice(0, -1);

  if (tryMock({ root, url, req, res })) return;
  if (mockRoot) {
    url = join(mockRoot, url);
    if (tryMock({ root, url, req, res })) return;
  }

  next();
};
